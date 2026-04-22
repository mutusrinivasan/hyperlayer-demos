export interface Money {
  amount: number;
  currency: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

export interface BankAccount {
  id: string;
  name: string;
  sortCode: string;
  accountNumberLast4: string;
  balance: Money;
  currency: string;
}

export type JarAccent = 'blue' | 'teal' | 'gold';
export type JarIcon = 'shield' | 'plane' | 'heart';

export interface Jar {
  id: string;
  name: string;
  balance: Money;
  targetBalance: Money;
  accent: JarAccent;
  icon: JarIcon;
}

export type TransactionType = 'card' | 'salary' | 'jar-topup' | 'transfer';

export type TransactionDirection = 'in' | 'out';

export interface Transaction {
  id: string;
  merchantName: string;
  category: string;
  date: string;
  amount: Money;
  type: TransactionType;
  direction: TransactionDirection;
  productSlug: string;
}

export type ScenarioLocale = 'UK' | 'CA' | 'US' | 'AU' | 'EU';

export interface Scenario {
  id: string;
  locale: ScenarioLocale;
  customer: Customer;
  account: BankAccount;
  jars: Jar[];
  transactions: Transaction[];
}
