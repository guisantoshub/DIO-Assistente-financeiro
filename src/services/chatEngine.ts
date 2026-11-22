import type { ChatMessage, MCPToolCall } from '../types';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS, PLUGGY_DOCUMENTATION_KNOWLEDGE } from '../data/mockData';

export interface ChatEngineResponse {
  message: ChatMessage;
}

export function processUserQuery(
  query: string,
  usdBrlRate: number = 5.85
): {
  replyText: string;
  toolCalls: MCPToolCall[];
  dataPayload?: any;
} {
  const normalized = query.toLowerCase();
  const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  // 1. Pergunta sobre SALDO / CONTAS
  if (
    normalized.includes('saldo') || 
    normalized.includes('conta') || 
    normalized.includes('quanto tenho') ||
    normalized.includes('dinheiro')
  ) {
    const totalCheckingSavingsUSD = MOCK_ACCOUNTS
      .filter(a => a.type === 'depository')
      .reduce((acc, curr) => acc + curr.currentBalance, 0);

    const creditDebtUSD = MOCK_ACCOUNTS
      .find(a => a.type === 'credit')?.currentBalance || 0;

    const totalBRL = totalCheckingSavingsUSD * usdBrlRate;
    const debtBRL = creditDebtUSD * usdBrlRate;

    const toolCalls: MCPToolCall[] = [
      {
        id: `call_${Date.now()}_1`,
        server: 'plaid',
        toolName: 'plaid_get_accounts',
        parameters: { client_id: 'sandbox_client_id', include_balances: true },
        resultSummary: `Retornou 4 contas ativas (Checking, Savings, CD, Credit Card). Saldo bruto em depósito: $${totalCheckingSavingsUSD.toFixed(2)} USD.`,
        latencyMs: 38,
        timestamp,
        endpointUrl: 'https://sandbox.plaid.com/accounts/balance/get'
      }
    ];

    const replyText = `### 📊 Resumo dos Seus Saldos (Plaid Sandbox)

Consultei o servidor **MCP Plaid** e obtive a posição consolidada das suas contas:

| Conta | Tipo | Saldo Atual (USD) | Em Reais (R$ ${usdBrlRate.toFixed(2)}) | Situação |
| :--- | :--- | :---: | :---: | :--- |
| **Plaid Checking** | Corrente | **$110,00** | R$ ${(110 * usdBrlRate).toFixed(2)} | Disponível |
| **Plaid Savings** | Poupança | **$23.631,98** | R$ ${(23631.98 * usdBrlRate).toFixed(2)} | Reserva |
| **Plaid CD** | Depósito Prazo | **$1.000,00** | R$ ${(1000 * usdBrlRate).toFixed(2)} | Aplicado |
| **Plaid Diamond** | Cartão de Crédito | **$410,00** | R$ ${debtBRL.toFixed(2)} | ⚠️ **Fatura a pagar** |

---

> 💡 **Total em Depósito Disponível:** **$${totalCheckingSavingsUSD.toFixed(2)} USD** (~**R$ ${totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}**)
> 
> 💳 **Fatura do Cartão (Passivo):** **$${creditDebtUSD.toFixed(2)} USD** (~**R$ ${debtBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}**)
> 
> 🛡️ *Aviso: Dados fictícios de sandbox da Plaid. No cartão de crédito, o saldo representa dívida acumulada no ciclo.*`;

    return {
      replyText,
      toolCalls,
      dataPayload: {
        type: 'accounts',
        data: MOCK_ACCOUNTS
      }
    };
  }

  // 2. Pergunta sobre PADRÕES DE GASTO / TRANSAÇÕES
  if (
    normalized.includes('padrão') || 
    normalized.includes('padroes') || 
    normalized.includes('gasto') || 
    normalized.includes('transa') ||
    normalized.includes('extrato') ||
    normalized.includes('compras')
  ) {
    const toolCalls: MCPToolCall[] = [
      {
        id: `call_${Date.now()}_2`,
        server: 'plaid',
        toolName: 'plaid_get_transactions',
        parameters: { 
          start_date: '2026-11-01', 
          end_date: '2026-11-22',
          count: 15
        },
        resultSummary: `Retornou 13 transações classificadas em 3 categorias principais de consumo.`,
        latencyMs: 42,
        timestamp,
        endpointUrl: 'https://sandbox.plaid.com/transactions/get'
      }
    ];

    // Cálculos dos 3 padrões
    const subTotal = MOCK_TRANSACTIONS
      .filter(t => t.spendingPattern === 'assinaturas_recorrentes')
      .reduce((sum, t) => sum + t.amount, 0);

    const foodTotal = MOCK_TRANSACTIONS
      .filter(t => t.spendingPattern === 'alimentacao_restaurantes')
      .reduce((sum, t) => sum + t.amount, 0);

    const retailTotal = MOCK_TRANSACTIONS
      .filter(t => t.spendingPattern === 'varejo_viagens')
      .reduce((sum, t) => sum + t.amount, 0);

    const replyText = `### 🔍 Análise dos 3 Padrões de Gasto Recentes

O servidor **MCP Plaid** processou as transações do período. Identificamos 3 padrões de consumo claros:

#### 1. 🔄 Assinaturas Recorrentes & Serviços Digitais
- **Total:** **$${subTotal.toFixed(2)} USD** (~R$ ${(subTotal * usdBrlRate).toFixed(2)})
- **Exemplos:** Netflix ($19.99), Spotify Family ($16.99), Amazon Prime ($14.99), GitHub Copilot ($10.00).
- *Comportamento:* Cobranças mensais fixas debitadas no cartão de crédito e na conta corrente.

#### 2. 🍔 Alimentação & Restaurantes
- **Total:** **$${foodTotal.toFixed(2)} USD** (~R$ ${(foodTotal * usdBrlRate).toFixed(2)})
- **Exemplos:** Starbucks ($8.75), Uber Eats ($34.50), Whole Foods ($78.40), In-N-Out Burger ($15.20).
- *Comportamento:* Despesas rotineiras de alimentação física e delivery.

#### 3. 🛍️ Varejo, Lojas & Mobilidade
- **Total:** **$${retailTotal.toFixed(2)} USD** (~R$ ${(retailTotal * usdBrlRate).toFixed(2)})
- **Exemplos:** Amazon Marketplace ($142.30), Apple Store ($29.00), CVS Pharmacy ($32.15), Uber Trip ($22.80).
- *Comportamento:* Compras de eletrônicos, farmácia e deslocamentos pontuais.

---

> 📌 **Lembrete de Convenção Plaid:** Na Plaid, **valores positivos representam saída de dinheiro (débito)** e **valores negativos representam entrada (crédito/salário)**. A folha da TechCorp entrou como \`-$2,500.00\`.`;

    return {
      replyText,
      toolCalls,
      dataPayload: {
        type: 'patterns',
        data: { subTotal, foodTotal, retailTotal, transactions: MOCK_TRANSACTIONS }
      }
    };
  }

  // 3. Pergunta sobre POR QUE CARTÃO É DÍVIDA
  if (
    normalized.includes('cartão') || 
    normalized.includes('cartao') || 
    normalized.includes('dívida') || 
    normalized.includes('divida') ||
    normalized.includes('passivo')
  ) {
    const toolCalls: MCPToolCall[] = [
      {
        id: `call_${Date.now()}_3`,
        server: 'pluggy',
        toolName: 'pluggy_explain_account_types',
        parameters: { schema: 'open_finance_brasil', type: 'credit_card' },
        resultSummary: `Definição técnica Open Finance: Cartões de crédito possuem saldo de natureza devedora (passivo circulante).`,
        latencyMs: 31,
        timestamp,
        endpointUrl: 'https://mcp.pluggy.ai/mcp/docs/schemas/credit-card'
      }
    ];

    const replyText = `### 💳 Por que o Saldo do Cartão de Crédito Aparece como Dívida?

Nas APIs bancárias e no **Open Finance** (tanto na Plaid quanto na Pluggy):

1. **Natureza Contábil (Passivo):** Uma conta corrente é um **ativo** seu (dinheiro seu guardado). Já o cartão de crédito é uma **linha de crédito concedida pelo banco** (um empréstimo rotativo).
2. **O Que Significa o Valor:** Quando o seu cartão *Plaid Diamond* mostra **$410.00**, isso **não significa que você tem $410 guardados**, mas sim que você utilizou **$410.00 do seu limite** e essa fatura está em aberto para pagamento.
3. **Limite vs. Fatura:**
   - **Limite Total:** $2.000,00
   - **Saldo Atual (Fatura Devedora):** **$410,00** (~R$ ${(410 * usdBrlRate).toFixed(2)})
   - **Saldo Disponível:** **$1.590,00** (margem que você ainda pode gastar antes do fechamento).

Por isso, na contabilidade e na resposta da IA, o saldo de cartão é apresentado como **dívida/passivo** para que o usuário não confunda com saldo positivo para saques.`;

    return {
      replyText,
      toolCalls,
      dataPayload: {
        type: 'mcp_explanation',
        data: { topic: 'card_debt' }
      }
    };
  }

  // 4. Pergunta sobre PLUGGY / ITEM / OPEN FINANCE BRASIL
  if (
    normalized.includes('pluggy') || 
    normalized.includes('item') || 
    normalized.includes('open finance') ||
    normalized.includes('brasil')
  ) {
    const toolCalls: MCPToolCall[] = [
      {
        id: `call_${Date.now()}_4`,
        server: 'pluggy',
        toolName: 'pluggy_search_docs',
        parameters: { query: 'O que é um Item no Open Finance Pluggy?' },
        resultSummary: `Encontrada documentação oficial em https://docs.pluggy.ai/docs/item-concept`,
        latencyMs: 45,
        timestamp,
        endpointUrl: 'https://mcp.pluggy.ai/mcp'
      }
    ];

    const replyText = `### 🇧🇷 O que é um "Item" na Pluggy e no Open Finance Brasil?

Conforme consultado na documentação oficial via **Streamable HTTP MCP Pluggy** (\`https://mcp.pluggy.ai/mcp\`):

> **Definição de Item:**
> ${PLUGGY_DOCUMENTATION_KNOWLEDGE.itemDefinition}

#### Principais Características de um Item:
1. **Conector Bancário:** Cada Item se conecta a um conector específico (ex: Conector Bradesco, Conector Itaú, Conector Nubank).
2. **Consentimento LGPD/BACEN:** No Brasil, a criação de um Item requer o consentimento expresso e autenticação em duas etapas (MFA) pelo titular da conta.
3. **Agregação de Contas:** Sob um único Item, a Pluggy descobre automaticamente todas as contas associadas àquele CPF/CNPJ (ex: conta corrente, poupança, cartão e investimentos).
4. **Status de Sincronização:** Um Item possui estados como \`UPDATING\`, \`UPDATED\`, \`WAITING_USER_INPUT\` ou \`LOGIN_ERROR\`.

*O MCP da Pluggy permite à IA consultar em tempo real schemas, conectores e guias de implementação do ecossistema financeiro brasileiro.*`;

    return {
      replyText,
      toolCalls,
      dataPayload: {
        type: 'mcp_explanation',
        data: { topic: 'pluggy_item' }
      }
    };
  }

  // 5. Pergunta sobre CONVENÇÃO DE SINAIS PLAID
  if (
    normalized.includes('sinal') || 
    normalized.includes('sinais') || 
    normalized.includes('positivo') || 
    normalized.includes('negativo')
  ) {
    const toolCalls: MCPToolCall[] = [
      {
        id: `call_${Date.now()}_5`,
        server: 'plaid',
        toolName: 'plaid_get_spec',
        parameters: { entity: 'transactions.amount' },
        resultSummary: `Regra de sinal Plaid: positive amount indicates cash outflow (expense/debit), negative indicates inflow (credit/deposit).`,
        latencyMs: 22,
        timestamp,
        endpointUrl: 'https://sandbox.plaid.com/spec'
      }
    ];

    const replyText = `### ➕➖ Convenção de Sinais na Plaid API

Ao trabalhar com o **mcp-server-plaid**, é crucial atentar-se à convenção contábil adotada:

- 🔴 **Valor POSITIVO (\`+amount\`):** Representa **SAÍDA de dinheiro** (débito, despesa, compra no débito/crédito, taxa bancária).
  - *Exemplo:* Comprar na Netflix por \`19.99\` vem como \`+19.99\`.
- 🟢 **Valor NEGATIVO (\`-amount\`):** Representa **ENTRADA de dinheiro** (crédito, depósito, estorno, salário).
  - *Exemplo:* Recebimento do salário da TechCorp de R$ 2.500 vem como \`-2500.00\`.

*Essa lógica decorre da perspectiva contábil anglo-saxã do balanço de passivos da instituição financeira.*`;

    return {
      replyText,
      toolCalls,
      dataPayload: {
        type: 'mcp_explanation',
        data: { topic: 'plaid_signs' }
      }
    };
  }

  // Resposta padrão contextual
  const toolCalls: MCPToolCall[] = [
    {
      id: `call_${Date.now()}_def`,
      server: 'plaid',
      toolName: 'plaid_health_check',
      parameters: { client_id: 'sandbox_client_id' },
      resultSummary: `MCP Server Plaid & Pluggy conectados e prontos para consulta.`,
      latencyMs: 19,
      timestamp
    }
  ];

  const replyText = `Olá! Sou seu **Assistente Financeiro Inteligente**. Estou conectado via **MCP (Model Context Protocol)** a duas fontes bancárias:
1. **Pluggy MCP** (\`https://mcp.pluggy.ai/mcp\`): Fornece conhecimento técnico do Open Finance Brasil (conceito de Item, conectores e consentimento).
2. **Plaid MCP** (\`mcp-server-plaid\`): Fornece dados em tempo real da sandbox de teste com contas, saldos e transações.

Você pode me perguntar:
- *"Qual é o meu saldo atual em todas as contas?"*
- *"Explique meus gastos recentes nos 3 padrões de consumo."*
- *"Por que o saldo do cartão aparece como dívida?"*
- *"O que é um Item na Pluggy?"*
- *"Como funciona a regra de sinais da Plaid?"*`;

  return {
    replyText,
    toolCalls
  };
}
