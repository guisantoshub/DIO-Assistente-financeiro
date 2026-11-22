const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function main() {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

  console.log('Using browser at:', executablePath);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Home Dashboard
  console.log('Capturing 01-dashboard-home.png...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, '01-dashboard-home.png') });

  // 2. Full Page Chat
  console.log('Capturing 02-assistente-chat-fullscreen.png...');
  // Click on "Assistente Chat (IA)" in sidebar
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text && text.includes('Assistente Chat')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  // Click the quick prompt "Saldo Geral" to show rich widgets
  const promptButtons = await page.$$('button');
  for (const pb of promptButtons) {
    const text = await page.evaluate(el => el.innerText, pb);
    if (text && text.includes('Saldo Geral')) {
      await pb.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(screenshotsDir, '02-assistente-chat-fullscreen.png') });

  // 3. Investments Page
  console.log('Capturing 03-investimentos-moderado.png...');
  const navButtons = await page.$$('button');
  for (const b of navButtons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text && text.includes('Investimentos')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotsDir, '03-investimentos-moderado.png') });

  // 4. Transactions & 3 Spending Patterns
  console.log('Capturing 04-transacoes-padroes.png...');
  const txButtons = await page.$$('button');
  for (const b of txButtons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text && text.includes('Transações & 3 Padrões')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotsDir, '04-transacoes-padroes.png') });

  // 5. Users and Profiles
  console.log('Capturing 05-usuarios-perfis.png...');
  const userButtons = await page.$$('button');
  for (const b of userButtons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text && text.includes('Usuários & Perfis')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotsDir, '05-usuarios-perfis.png') });

  // 6. Architecture Drawer ("O Caminho da Resposta")
  console.log('Capturing 06-caminho-da-resposta.png...');
  const archButtons = await page.$$('button');
  for (const b of archButtons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text && text.includes('Caminhos & Respostas')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotsDir, '06-caminho-da-resposta.png') });

  // Close drawer by pressing Escape or close button
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));

  // 7. Floating Chat Widget (Back to Home, then open floating chat)
  console.log('Capturing 07-chat-flutuante.png...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  // Find FAB button "Assistente IA" and click it
  const fabButtons = await page.$$('button');
  for (const b of fabButtons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text && text.includes('Assistente IA')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotsDir, '07-chat-flutuante.png') });

  // 8. Notifications Drawer
  console.log('Capturing 08-notificacoes.png...');
  const bellButton = await page.$('button[title*="Notificações"]');
  if (bellButton) {
    await bellButton.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotsDir, '08-notificacoes.png') });
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 500));
  }

  // 9. Login Page
  console.log('Capturing 09-tela-login.png...');
  const logoutButtons = await page.$$('button');
  for (const b of logoutButtons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text && text.includes('Sair')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotsDir, '09-tela-login.png') });

  console.log('All screenshots captured successfully in docs/screenshots!');
  await browser.close();
}

main().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
