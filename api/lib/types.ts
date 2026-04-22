// Types mirror the Hyperlayer B2C platform model.
// Monetary amounts are decimal strings ("4287.50") to avoid JS float-precision issues.
//
// TODO (sub-prompt 2): reconcile client/server transaction `type` vocabulary.
// Server uses: 'card' | 'salary' | 'jar-transfer'
// Client currently uses: 'card' | 'salary' | 'jar-topup' | 'transfer'
// The client refactor in sub-prompt 2 aligns the client on the server's vocabulary.

export type MoneyString = string;

export interface Customer {
  customerId: string;
  firstName: string;
  lastName: string;
}

export interface Balance {
  total: MoneyString;
  reserved: MoneyString;
  currency: string;
}

export interface BankAccount {
  bankAccountId: string;
  bankAccountType: string;
  status: 'ACTIVE';
  owners: string[];
  balance: Balance;
  paymentIdentifiers: {
    sortCode: string;
    accountNumber: string; // full; client receives only last-4
  };
  // Client-presentation extensions (see docs/api-gaps.md, future):
  name: string;
}

export interface Jar {
  jarId: string;
  name: string;
  bankAccountId: string;
  balance: MoneyString;
  createdTimestamp: string;
  lastUpdatedTimestamp: string;
  // Client-presentation extensions:
  dynamicAttributes: {
    targetBalance?: MoneyString;
    accent?: 'blue' | 'teal' | 'gold';
    icon?: 'shield' | 'plane' | 'heart';
  };
}

export interface Transaction {
  transactionId: string;
  customerId: string;
  bankAccountId: string;
  jarId: string | null;
  direction: 'in' | 'out';
  amount: MoneyString;
  currency: string;
  merchantName: string;
  category: string;
  createdTimestamp: string;
  type: 'card' | 'salary' | 'jar-transfer';
}

export interface DemoState {
  customer: Customer;
  bankAccount: BankAccount;
  jars: Jar[];
  transactions: Transaction[];
}
