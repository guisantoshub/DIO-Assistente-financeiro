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
