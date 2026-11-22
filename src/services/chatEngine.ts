import type { ChatMessage, MCPToolCall } from '../types';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from '../data/mockData';

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

    const toolCalls: MCPToolCall[] = [
      {
        id: `call_${Date.now()}_1`,
        server: 'plaid',
        toolName: 'plaid_get_accounts',
        parameters: { client_id: 'sandbox_client_id', include_balances: true },
        resultSummary: `Retornou 4 contas ativas (Checking, Savings, CD, Credit Card). Saldo líquido em depósito: $${totalCheckingSavingsUSD.toFixed(2)} USD.`,
        latencyMs: 38,
        timestamp,
        endpointUrl: 'https://sandbox.plaid.com/accounts/balance/get'
      }
    ];

    const replyText = `Consultei o servidor **MCP Plaid** e obtive a posição consolidada das suas contas em tempo real.

Abaixo você confere o resumo financeiro com conversão declarada em Reais (cotação **US$ 1 = R$ ${usdBrlRate.toFixed(2)}**), separando claramente o **saldo disponível em depósito** da **fatura do cartão de crédito**:`;

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

    const subTotal = MOCK_TRANSACTIONS
      .filter(t => t.spendingPattern === 'assinaturas_recorrentes')
      .reduce((sum, t) => sum + t.amount, 0);

    const foodTotal = MOCK_TRANSACTIONS
      .filter(t => t.spendingPattern === 'alimentacao_restaurantes')
      .reduce((sum, t) => sum + t.amount, 0);

    const retailTotal = MOCK_TRANSACTIONS
      .filter(t => t.spendingPattern === 'varejo_viagens')
      .reduce((sum, t) => sum + t.amount, 0);

    const replyText = `O servidor **MCP Plaid** processou seu extrato recente. Agrupamos seus gastos em **3 padrões de consumo claros** para você visualizar onde seu dinheiro está sendo alocado:`;

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

    const replyText = `Nas APIs bancárias e no **Open Finance** (Plaid e Pluggy), o saldo de um **cartão de crédito** tem uma natureza contábil oposta à de uma conta corrente. Veja o comparativo visual abaixo:`;

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

    const replyText = `Consultei a documentação oficial via **Streamable HTTP MCP Pluggy** (\`https://mcp.pluggy.ai/mcp\`). 

No ecossistema brasileiro de Open Finance, um **Item** é o alicerce de toda integração financeira:`;

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

    const replyText = `Ao trabalhar com a API da **Plaid**, a convenção contábil de sinais pode parecer contra-intuitiva à primeira vista:

- 🔴 **Valor Positivo (\`+19.99\`):** Representa **SAÍDA de dinheiro (Débito/Compra)**.
- 🟢 **Valor Negativo (\`-2500.00\`):** Representa **ENTRADA de dinheiro (Crédito/Salário)**.

Isso ocorre porque a conta bancária é tratada sob a perspectiva contábil de passivo da instituição. Nosso assistente normaliza essa visualização para facilitar o entendimento do usuário final.`;

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

  const replyText = `Olá! Sou seu **Assistente Financeiro Inteligente**. Estou conectado via **MCP (Model Context Protocol)** à **Pluggy** (Open Finance Brasil) e à **Plaid** (Sandbox de Contas e Extratos).

Escolha uma das perguntas rápidas abaixo ou me pergunte diretamente sobre seus saldos, faturas ou padrões de consumo!`;

  return {
    replyText,
    toolCalls
  };
}
