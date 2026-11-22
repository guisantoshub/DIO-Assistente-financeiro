import type { Account, Transaction } from '../types';

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc_plaid_chk_01',
    name: 'Plaid Checking (Conta Corrente)',
    officialName: 'Plaid Gold Standard Checking Account',
    type: 'depository',
    subtype: 'checking',
    mask: '0000',
    currentBalance: 110.00,
    availableBalance: 100.00,
    currency: 'USD',
    isoCurrencyCode: 'USD',
    institutionName: 'First Platypus Bank (Plaid Sandbox)',
  },
  {
    id: 'acc_plaid_sav_02',
    name: 'Plaid Savings (Poupança Reserva)',
    officialName: 'Plaid Silver High-Yield Savings Account',
    type: 'depository',
    subtype: 'savings',
    mask: '1111',
    currentBalance: 23631.98,
    availableBalance: 23631.98,
    currency: 'USD',
    isoCurrencyCode: 'USD',
    institutionName: 'First Platypus Bank (Plaid Sandbox)',
  },
  {
    id: 'acc_plaid_crd_03',
    name: 'Plaid Diamond Credit Card',
    officialName: 'Plaid Premier Cashback Rewards',
    type: 'credit',
    subtype: 'credit card',
    mask: '3333',
    currentBalance: 410.00, // Dívida/Fatura acumulada
    availableBalance: 1590.00, // Limite restante disponível
    limit: 2000.00,
    currency: 'USD',
    isoCurrencyCode: 'USD',
    institutionName: 'First Platypus Bank (Plaid Sandbox)',
  },
  {
    id: 'acc_plaid_cd_04',
    name: 'Plaid CD (Certificado de Depósito)',
    officialName: 'Plaid 12 Month Term Certificate',
    type: 'depository',
    subtype: 'money market',
    mask: '2222',
    currentBalance: 1000.00,
    availableBalance: 1000.00,
    currency: 'USD',
    isoCurrencyCode: 'USD',
    institutionName: 'First Platypus Bank (Plaid Sandbox)',
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  // Padrão 1: Assinaturas Recorrentes (Software, Streaming, Cloud)
  {
    id: 'tx_sub_01',
    accountId: 'acc_plaid_crd_03',
    name: 'Netflix.com',
    merchantName: 'Netflix',
    amount: 19.99, // Saída / Débito na Plaid
    date: '2026-11-20',
    category: ['Subscriptions', 'Entertainment'],
    spendingPattern: 'assinaturas_recorrentes',
    pending: false,
    paymentChannel: 'online'
  },
  {
    id: 'tx_sub_02',
    accountId: 'acc_plaid_crd_03',
    name: 'Spotify Premium Family',
    merchantName: 'Spotify',
    amount: 16.99,
    date: '2026-11-18',
    category: ['Subscriptions', 'Music'],
    spendingPattern: 'assinaturas_recorrentes',
    pending: false,
    paymentChannel: 'online'
  },
  {
    id: 'tx_sub_03',
    accountId: 'acc_plaid_chk_01',
    name: 'Amazon Prime Membership',
    merchantName: 'Amazon',
    amount: 14.99,
    date: '2026-11-15',
    category: ['Subscriptions', 'Retail'],
    spendingPattern: 'assinaturas_recorrentes',
    pending: false,
    paymentChannel: 'online'
  },
  {
    id: 'tx_sub_04',
    accountId: 'acc_plaid_crd_03',
    name: 'GitHub Copilot Pro',
    merchantName: 'GitHub',
    amount: 10.00,
    date: '2026-11-10',
    category: ['Subscriptions', 'Developer Tools'],
    spendingPattern: 'assinaturas_recorrentes',
    pending: false,
    paymentChannel: 'online'
  },

  // Padrão 2: Alimentação & Restaurantes (Delivery, Cafeteria, Refeições)
  {
    id: 'tx_food_01',
    accountId: 'acc_plaid_crd_03',
    name: 'Starbucks Store #4821',
    merchantName: 'Starbucks',
    amount: 8.75,
    date: '2026-11-21',
    category: ['Food and Drink', 'Coffee Shop'],
    spendingPattern: 'alimentacao_restaurantes',
    pending: false,
    paymentChannel: 'in store'
  },
  {
    id: 'tx_food_02',
    accountId: 'acc_plaid_crd_03',
    name: 'Uber Eats Order',
    merchantName: 'Uber Eats',
    amount: 34.50,
    date: '2026-11-19',
    category: ['Food and Drink', 'Restaurants'],
    spendingPattern: 'alimentacao_restaurantes',
    pending: false,
    paymentChannel: 'online'
  },
  {
    id: 'tx_food_03',
    accountId: 'acc_plaid_chk_01',
    name: 'Whole Foods Market',
    merchantName: 'Whole Foods',
    amount: 78.40,
    date: '2026-11-17',
    category: ['Food and Drink', 'Groceries'],
    spendingPattern: 'alimentacao_restaurantes',
    pending: false,
    paymentChannel: 'in store'
  },
  {
    id: 'tx_food_04',
    accountId: 'acc_plaid_crd_03',
    name: 'In-N-Out Burger #104',
    merchantName: 'In-N-Out Burger',
    amount: 15.20,
    date: '2026-11-14',
    category: ['Food and Drink', 'Fast Food'],
    spendingPattern: 'alimentacao_restaurantes',
    pending: false,
    paymentChannel: 'in store'
  },

  // Padrão 3: Varejo, Lojas & Serviços de Transporte
  {
    id: 'tx_ret_01',
    accountId: 'acc_plaid_crd_03',
    name: 'Amazon Marketplace Electronics',
    merchantName: 'Amazon',
    amount: 142.30,
    date: '2026-11-20',
    category: ['Shops', 'Electronics'],
    spendingPattern: 'varejo_viagens',
    pending: false,
    paymentChannel: 'online'
  },
  {
    id: 'tx_ret_02',
    accountId: 'acc_plaid_chk_01',
    name: 'Uber Trip Ride BR90',
    merchantName: 'Uber',
    amount: 22.80,
    date: '2026-11-18',
    category: ['Travel', 'Taxi'],
    spendingPattern: 'varejo_viagens',
    pending: false,
    paymentChannel: 'online'
  },
  {
    id: 'tx_ret_03',
    accountId: 'acc_plaid_crd_03',
    name: 'Apple Store Retail Store',
    merchantName: 'Apple',
    amount: 29.00,
    date: '2026-11-12',
    category: ['Shops', 'Computers & Accessories'],
    spendingPattern: 'varejo_viagens',
    pending: false,
    paymentChannel: 'in store'
  },
  {
    id: 'tx_ret_04',
    accountId: 'acc_plaid_chk_01',
    name: 'CVS Pharmacy Prescription',
    merchantName: 'CVS Pharmacy',
    amount: 32.15,
    date: '2026-11-08',
    category: ['Shops', 'Pharmacies'],
    spendingPattern: 'varejo_viagens',
    pending: false,
    paymentChannel: 'in store'
  },

  // Rendimentos / Entradas (valor negativo na convenção Plaid = Crédito/Entrada)
  {
    id: 'tx_inc_01',
    accountId: 'acc_plaid_chk_01',
    name: 'Transferência / Folha de Pagamento TechCorp',
    merchantName: 'TechCorp Payroll',
    amount: -2500.00, // Negativo na Plaid = Entrada de dinheiro
    date: '2026-11-05',
    category: ['Transfer', 'Payroll'],
    spendingPattern: 'rendimentos_credito',
    pending: false,
    paymentChannel: 'other'
  }
];

export const PLUGGY_DOCUMENTATION_KNOWLEDGE = {
  itemDefinition: `Na Pluggy e no ecossistema Open Finance do Brasil, um **Item** representa a conexão única e autenticada entre um usuário e uma instituição financeira específica (ex: Itaú, Bradesco, Nubank, Banco do Brasil). Ele encapsula as credenciais, tokens de acesso, status da sincronização e parâmetros de consentimento legal do cliente. Um Item contém uma ou mais contas (Checking, Savings, Credit Card, Investimentos).`,
  connectorsDefinition: `Os **Connectors** da Pluggy são os adaptadores para cada uma das mais de 80 instituições financeiras suportadas no Brasil, cuidando do fluxo de autenticação MFA, consentimento LGPD/BACEN e extração padronizada de dados.`,
  cardDebtMechanic: `No Open Finance (Pluggy e Plaid), o saldo exibido em um **cartão de crédito** representa o montante de **dívida acumulada (fatura atual a pagar)**, e não um saldo a favor como na conta corrente. Por isso, quando o cartão mostra $410.00 (ou R$ 2.460,00), significa que esse é o valor devido. O valor disponível ($1,590.00) é o limite restante de crédito.`,
  plaidSignConvention: `**Regra de Sinal da Plaid:** Na Plaid API, **valores positivos representam saída de dinheiro** (débito, despesa, compras), enquanto **valores negativos representam entrada de dinheiro** (depósitos, estornos, salários). Essa é uma convenção contábil anglo-saxã onde a conta do usuário é tratada do ponto de vista do passivo do banco.`
};

import type { InvestmentPortfolio, NotificationItem, UserProfile } from '../types';

export const MOCK_INVESTMENTS: InvestmentPortfolio = {
  profile: 'Moderado',
  totalValueBRL: 84500.00,
  totalValueUSD: 14444.44,
  returnLast12Months: 13.82,
  benchmarkPct: 122,
  assets: [
    {
      id: 'inv_01',
      name: 'CDB Bradesco Prime 110% CDI',
      category: 'Renda Fixa Pós',
      allocationPct: 35,
      valueBRL: 29575.00,
      valueUSD: 5055.55,
      expectedReturn: '110% do CDI (14.2% a.a.)',
      riskLevel: 'Baixo',
      institution: 'Banco Bradesco'
    },
    {
      id: 'inv_02',
      name: 'Tesouro IPCA+ 2035 com Juros Semestrais',
      category: 'Renda Fixa Inflação',
      allocationPct: 25,
      valueBRL: 21125.00,
      valueUSD: 3611.11,
      expectedReturn: 'IPCA + 6.35% a.a.',
      riskLevel: 'Baixo',
      institution: 'Tesouro Direto / Bradesco'
    },
    {
      id: 'inv_03',
      name: 'Fundos Imobiliários (HGLG11 & KNCR11)',
      category: 'Fundos Imobiliários',
      allocationPct: 20,
      valueBRL: 16900.00,
      valueUSD: 2888.88,
      expectedReturn: 'Dividend Yield 9.4% a.a.',
      riskLevel: 'Médio',
      institution: 'B3 / Bradesco Corretora'
    },
    {
      id: 'inv_04',
      name: 'Ações Dividendos Brasil (ITSA4, BBSE3, VIVT3)',
      category: 'Ações & Dividendos',
      allocationPct: 15,
      valueBRL: 12675.00,
      valueUSD: 2166.66,
      expectedReturn: 'Dividend Yield 8.2% + Ganho de Capital',
      riskLevel: 'Médio',
      institution: 'B3 / Ágora Investimentos'
    },
    {
      id: 'inv_05',
      name: 'Plaid CD 12-Month Term Certificate',
      category: 'Internacional',
      allocationPct: 5,
      valueBRL: 4225.00,
      valueUSD: 722.24,
      expectedReturn: '5.10% a.a. em USD',
      riskLevel: 'Baixo',
      institution: 'First Platypus Bank (Plaid Sandbox)'
    }
  ]
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Fatura do Cartão fecha em 3 dias',
    description: 'Sua fatura de US$ 410,00 (≈ R$ 2.398,50) vence em 25/11. Saldo em conta suficiente para quitação integral.',
    timestamp: 'Há 15 minutos',
    type: 'alert',
    read: false
  },
  {
    id: 'notif_2',
    title: 'Proventos creditados em conta',
    description: 'Recebimento de R$ 284,10 referentes ao rendimento mensal do CDB 110% CDI e dividendos de FIIs.',
    timestamp: 'Hoje, 09:30',
    type: 'success',
    read: false
  },
  {
    id: 'notif_3',
    title: 'Sincronização MCP Concluída',
    description: 'Servidores Pluggy (Open Finance Brasil) e Plaid (Sandbox) sincronizaram dados com 0 erros de autorização.',
    timestamp: 'Ontem, 18:45',
    type: 'info',
    read: true
  }
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'usr_main',
    name: 'Guilherme Santos',
    email: 'guilherme.santos@dio.demo',
    role: 'Titular da Conta Principal',
    documentMasked: '•••.482.918-••',
    investorProfile: 'Moderado',
    status: 'Ativo'
  },
  {
    id: 'usr_dep_1',
    name: 'Maria Silva',
    email: 'maria.silva@dio.demo',
    role: 'Dependente / Cartão Adicional',
    documentMasked: '•••.912.304-••',
    investorProfile: 'Conservador',
    status: 'Ativo'
  },
  {
    id: 'usr_bot_mcp',
    name: 'Pluggy Open Finance Sync',
    email: 'mcp-agent@pluggy.ai',
    role: 'Agente MCP Autorizado BACEN',
    documentMasked: 'CNPJ ••.•••.•••/0001-••',
    investorProfile: 'Auditoria & Leitura',
    status: 'Ativo'
  }
];
