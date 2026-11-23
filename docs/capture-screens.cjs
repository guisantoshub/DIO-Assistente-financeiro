const puppeteer = require('puppeteer-core');
const path = require('node:path');
const fs = require('node:fs');
const assert = require('node:assert/strict');

async function main() {
  const directory = path.join(__dirname, 'screenshots');
  fs.mkdirSync(directory, { recursive: true });
  const executablePath = process.env.CHROME_PATH || [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium',
  ].find(candidate => fs.existsSync(candidate));
  if (!executablePath) throw new Error('Informe CHROME_PATH com o caminho do Chrome ou Edge.');
  const browser = await puppeteer.launch({ executablePath, headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(process.env.CAPTURE_URL || 'http://localhost:5173', { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const click = label => page.locator(`button[aria-label="${label}"]`).click();
    const tab = async label => {
      const mobile = (await page.viewport()).width < 768;
      await page.locator(`nav[aria-label="${mobile ? 'Navegação mobile' : 'Navegação principal'}"] button[aria-label="${label}"]`).click();
      await page.waitForFunction(() => window.scrollY === 0);
    };
    const shot = async (name, fullPage = false) => {
      await page.screenshot({ path: path.join(directory, name), type: 'jpeg', quality: 90, fullPage });
      console.log(name);
    };
    const assertLayout = async () => {
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        gap: innerWidth >= 768 ? document.querySelector('.page-heading').getBoundingClientRect().left - document.querySelector('.app-sidebar').getBoundingClientRect().right : null,
        inputFits: !document.querySelector('.chat-composer') || document.querySelector('.chat-composer').getBoundingClientRect().bottom <= innerHeight,
      }));
      assert.equal(result.overflow, false, 'A página não deve apresentar rolagem horizontal.');
      if (result.gap !== null) assert.ok(Math.abs(result.gap - 40) < 1, 'O conteúdo deve ficar a 40 px do menu.');
      assert.equal(result.inputFits, true, 'O campo de mensagem deve permanecer visível.');
    };
    await shot('01-dashboard-home.jpg', true);
    await tab('Assistente IA');
    await page.locator('.quick-prompts button').filter(button => button.innerText === 'Meu saldo').click();
    await page.waitForSelector('.chat-account-list');
    await assertLayout();
    await shot('02-assistente-chat-fullscreen.jpg');
    await click('Recolher menu');
    await page.waitForFunction(() => Math.abs(document.querySelector('.app-sidebar').getBoundingClientRect().width - 80) < 1);
    await assertLayout();
    await shot('13-assistente-menu-recolhido.jpg');
    await click('Expandir menu');
    await page.waitForFunction(() => Math.abs(document.querySelector('.app-sidebar').getBoundingClientRect().width - 248) < 1);
    await tab('Investimentos'); await shot('03-investimentos-moderado.jpg', true);
    await tab('Transações'); await shot('04-transacoes-padroes.jpg', true);
    await tab('Perfis e acessos'); await shot('05-usuarios-perfis.jpg');
    await click('Configurações'); await shot('06-configuracoes.jpg'); await click('Fechar configurações');
    await tab('Visão geral'); await click('Abrir assistente financeiro'); await shot('07-chat-flutuante.jpg'); await click('Fechar assistente');
    await click('Notificações'); await shot('08-notificacoes.jpg'); await click('Fechar notificações');
    await click('Sair'); await shot('09-tela-login.jpg');
    await page.locator('.login-access button').click();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await tab('Visão geral'); await assertLayout(); await shot('10-dashboard-mobile.jpg');
    await tab('Assistente IA'); await assertLayout(); await shot('11-assistente-mobile.jpg');
    await click('Usar assistente em janela flutuante'); await assertLayout(); await shot('12-chat-flutuante-mobile.jpg'); await click('Fechar assistente');
    for (const viewport of [{width:320,height:640},{width:390,height:480},{width:768,height:1024},{width:1024,height:768}]) {
      await page.setViewport(viewport);
      for (const label of ['Visão geral', 'Transações', 'Investimentos', 'Perfis e acessos', 'Assistente IA']) { await tab(label); await assertLayout(); }
    }
    console.log('Galeria atualizada e verificações de layout concluídas.');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
