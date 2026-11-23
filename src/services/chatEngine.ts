import type { ChatMessage, MCPToolCall } from "../types";
import {
  MOCK_ACCOUNTS,
  MOCK_TRANSACTIONS,
  MOCK_INVESTMENTS,
} from "../data/mockData";
export function processUserQuery(
  query: string,
  usdBrlRate = 5.85,
): {
  replyText: string;
  toolCalls: MCPToolCall[];
  dataPayload?: ChatMessage["dataPayload"];
} {
  const normalized = query
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  // Internal educational metadata is retained, but never rendered in the customer UI.
  const result = (
    replyText: string,
    toolName: string,
    dataPayload?: ChatMessage["dataPayload"],
  ) => ({
    replyText,
    dataPayload,
    toolCalls: [
      {
        id: `call-${Date.now()}`,
        server: "plaid" as const,
        toolName,
        parameters: { simulated: true },
        resultSummary:
          "Resposta gerada a partir dos dados de demonstração locais.",
        latencyMs: 0,
        timestamp: new Date().toLocaleTimeString("pt-BR"),
      },
    ],
  });
  if (/cartao|fatura|divida|passivo/.test(normalized)) {
    const card = MOCK_ACCOUNTS.find((account) => account.type === "credit");
    const usd = (value: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    return result(
      `Sua fatura em aberto é de **${usd(card?.currentBalance ?? 0)}**. Esse é o valor das compras que ainda precisa pagar.\n\nO limite disponível para novas compras é de **${usd(card?.availableBalance ?? 0)}**. Ele não faz parte do dinheiro que você tem em conta.\n\nNa visão geral, mostramos a fatura separada dos seus saldos para facilitar o acompanhamento.`,
      "explain_credit_card",
    );
  }
  if (/invest|carteira|moderado|cdb|fii|acoes|rendimento/.test(normalized)) {
    const portfolio = MOCK_INVESTMENTS;
    return result(
      `### Sua carteira em perspectiva\n\nNa demonstração, seu patrimônio é de **R$ 84.500,00** (aproximadamente US$ ${(portfolio.totalValueBRL / usdBrlRate).toFixed(2)}). A rentabilidade ilustrativa dos últimos 12 meses é de **13,82%**.\n\nA composição da carteira é:\n\n- **35%** em renda fixa pós-fixada.\n- **25%** em títulos ligados à inflação.\n- **20%** em fundos imobiliários.\n- **15%** em ações de dividendos.\n- **5%** em aplicações em dólar.\n\nVeja os ativos e seus valores em **Investimentos**. Esta é uma composição ilustrativa, sem recomendação personalizada.`,
      "get_investments",
    );
  }
  if (/gasto|padrao|padroes|transa|extrato|compras|despesa/.test(normalized)) {
    const sum = (pattern: string) =>
      MOCK_TRANSACTIONS.filter(
        (transaction) =>
          transaction.spendingPattern === pattern && transaction.amount > 0,
      ).reduce((total, transaction) => total + transaction.amount, 0);
    return result(
      "Seus gastos estão organizados em **três grupos**. Assim fica mais fácil perceber quais despesas são recorrentes e quais variam no mês.",
      "get_transactions",
      {
        type: "patterns",
        data: {
          subTotal: sum("assinaturas_recorrentes"),
          foodTotal: sum("alimentacao_restaurantes"),
          retailTotal: sum("varejo_viagens"),
          transactions: MOCK_TRANSACTIONS,
        },
      },
    );
  }
  if (/saldo|conta|quanto tenho|dinheiro/.test(normalized)) {
    const total = MOCK_ACCOUNTS.filter(
      (account) => account.type === "depository",
    ).reduce((sum, account) => sum + account.currentBalance, 0);
    const balance = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total);
    return result(
      `Você tem **${balance}** em contas de depósito nesta demonstração. A fatura do cartão aparece separadamente, pois é um valor a pagar.\n\nConfira o detalhamento abaixo. A conversão usa a cotação de referência de **R$ ${usdBrlRate.toFixed(2).replace(".", ",")} por dólar**.`,
      "get_accounts",
      { type: "accounts", data: MOCK_ACCOUNTS },
    );
  }
  if (/sinal|sinais|positivo|negativo|entrada|saida/.test(normalized))
    return result(
      "No seu extrato, **entradas aparecem com +** e **saídas com −**. O salário é uma entrada; uma compra é uma saída. Você também encontra a identificação de cada movimentação ao lado do valor.",
      "explain_transactions",
    );
  if (/open finance|pluggy|plaid|item|mcp/.test(normalized))
    return result(
      "O **Open Finance** permite compartilhar informações financeiras entre instituições com a sua autorização. Você escolhe o que compartilhar e pode gerenciar as permissões no aplicativo do seu banco.\n\nNesta demonstração, todos os dados são ilustrativos e nenhuma conta real é acessada.",
      "explain_open_finance",
    );
  return result(
    "Posso ajudar com **saldos**, **fatura do cartão**, **gastos** e **investimentos** desta demonstração.\n\nExperimente perguntar “Como estão meus gastos?” ou escolha uma das sugestões abaixo.",
    "help",
  );
}
