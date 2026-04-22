// Typed client for the MCP server tools. Uses same-origin relative URLs so
// it works locally and on Vercel without any env wiring.

export interface ServerCustomerProfile {
  customerId: string;
  firstName: string;
  lastName: string;
  bankAccount: {
    bankAccountId: string;
    name: string;
    balance: { total: string; reserved: string; currency: string };
    sortCode: string;
    accountNumberLast4: string;
  };
}

export interface ServerJar {
  jarId: string;
  name: string;
  bankAccountId: string;
  balance: string;
  createdTimestamp: string;
  lastUpdatedTimestamp: string;
  dynamicAttributes: {
    targetBalance?: string;
    accent?: 'blue' | 'teal' | 'gold';
    icon?: 'shield' | 'plane' | 'heart';
  };
}

export interface ServerTransaction {
  transactionId: string;
  customerId: string;
  bankAccountId: string;
  jarId: string | null;
  direction: 'in' | 'out';
  amount: string;
  currency: string;
  merchantName: string;
  category: string;
  createdTimestamp: string;
  type: 'card' | 'salary' | 'jar-transfer';
}

async function callTool<TResponse>(toolName: string, body: object = {}): Promise<TResponse> {
  const res = await fetch(`/api/tools/${toolName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Tool ${toolName} failed: ${res.status}`);
  }
  const json = (await res.json()) as { data: TResponse };
  return json.data;
}

export const api = {
  getCustomerProfile: () => callTool<ServerCustomerProfile>('get-customer-profile'),
  getJars: () => callTool<ServerJar[]>('get-customer-jars'),
  getTransactions: (jarId?: string) =>
    callTool<ServerTransaction[]>('get-customer-transactions', jarId ? { jarId } : {}),
};
