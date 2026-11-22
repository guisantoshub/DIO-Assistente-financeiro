export type AccountType = 'depository' | 'credit' | 'loan' | 'investment';
export type AccountSubtype = 'checking' | 'savings' | 'credit card' | 'money market';

export interface Account {
  id: string;
  name: string;
  officialName?: string;
  type: AccountType;
  subtype: AccountSubtype;
  mask: string;
  currentBalance: number;
  availableBalance?: number;
  limit?: number;
  currency: string;
  isoCurrencyCode: string;
  institutionName: string;
}

export type SpendingPatternType = 
  | 'assinaturas_recorrentes' 
  | 'alimentacao_restaurantes' 
  | 'varejo_viagens'
  | 'rendimentos_credito';

export interface Transaction {
  id: string;
  accountId: string;
  name: string;
  merchantName?: string;
  amount: number; // In Plaid: positive = debit/expense, negative = credit/refund/deposit
  date: string;
  category: string[];
  spendingPattern: SpendingPatternType;
  pending: boolean;
  paymentChannel: 'in store' | 'online' | 'other';
  logoUrl?: string;
}

export interface MCPToolCall {
  id: string;
  server: 'plaid' | 'pluggy';
  toolName: string;
  parameters: Record<string, any>;
  resultSummary: string;
  latencyMs: number;
  timestamp: string;
  endpointUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  toolCalls?: MCPToolCall[];
  dataPayload?: {
    type: 'accounts' | 'transactions' | 'patterns' | 'mcp_explanation' | 'conversion';
    data: any;
  };
}

export interface MCPConfig {
  pluggyUrl: string;
  pluggyStatus: 'connected' | 'disconnected' | 'connecting';
  plaidClientId: string;
  plaidSecret: string;
  plaidEnv: 'sandbox' | 'development' | 'production';
  plaidStatus: 'connected' | 'disconnected' | 'connecting';
  usdBrlRate: number;
}
