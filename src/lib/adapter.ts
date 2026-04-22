import type {
  ServerCustomerProfile,
  ServerJar,
  ServerTransaction,
} from '@/lib/api';
import { jarSlug } from '@/lib/slug';
import type {
  BankAccount,
  Customer,
  Jar,
  JarAccent,
  JarIcon,
  Money,
  Scenario,
  Transaction,
  TransactionType,
} from '@/types/scenario';

// NOTE: decimal strings from the server are parsed to `number` here to match the
// existing client `Money.amount: number` shape. This reintroduces JS float
// imprecision that the server avoids by using strings. Acceptable for the
// current demo — no arithmetic in the UI layer beyond percentage rendering.
// Future work: migrate the client's Money to a decimal-safe representation.
function parseMoney(amountStr: string, currency: string): Money {
  return { amount: parseFloat(amountStr), currency };
}

// Reconciliation: server vocabulary 'jar-transfer' maps to client 'jar-topup'.
// The client's 'transfer' value isn't produced today — when account-to-account
// transfers land on the server as a distinct type, extend this map.
function adaptTransactionType(serverType: ServerTransaction['type']): TransactionType {
  if (serverType === 'jar-transfer') return 'jar-topup';
  return serverType;
}

function adaptCustomer(profile: ServerCustomerProfile): Customer {
  return {
    id: profile.customerId,
    firstName: profile.firstName,
    lastName: profile.lastName,
  };
}

function adaptAccount(profile: ServerCustomerProfile): BankAccount {
  const { bankAccount } = profile;
  const total = parseFloat(bankAccount.balance.total);
  const reserved = parseFloat(bankAccount.balance.reserved);
  const available = total - reserved;
  return {
    id: bankAccount.bankAccountId,
    name: bankAccount.name,
    sortCode: bankAccount.sortCode,
    accountNumberLast4: bankAccount.accountNumberLast4,
    balance: { amount: available, currency: bankAccount.balance.currency },
    currency: bankAccount.balance.currency,
  };
}

function adaptJar(serverJar: ServerJar): Jar {
  const { dynamicAttributes } = serverJar;
  const currency = 'GBP';
  return {
    id: serverJar.jarId,
    name: serverJar.name,
    balance: parseMoney(serverJar.balance, currency),
    targetBalance: parseMoney(dynamicAttributes.targetBalance ?? '0', currency),
    accent: (dynamicAttributes.accent ?? 'blue') as JarAccent,
    icon: (dynamicAttributes.icon ?? 'shield') as JarIcon,
  };
}

function adaptTransaction(
  serverTx: ServerTransaction,
  jarNamesById: Map<string, string>,
): Transaction {
  const productSlug = serverTx.jarId
    ? jarSlug({ name: jarNamesById.get(serverTx.jarId) ?? serverTx.jarId })
    : 'current-account';

  return {
    id: serverTx.transactionId,
    merchantName: serverTx.merchantName,
    category: serverTx.category,
    date: serverTx.createdTimestamp,
    amount: parseMoney(serverTx.amount, serverTx.currency),
    type: adaptTransactionType(serverTx.type),
    direction: serverTx.direction,
    productSlug,
  };
}

export function adaptScenario(
  profile: ServerCustomerProfile,
  serverJars: ServerJar[],
  serverTxs: ServerTransaction[],
): Scenario {
  const jars = serverJars.map(adaptJar);
  const jarNamesById = new Map(serverJars.map((j) => [j.jarId, j.name]));

  return {
    // Scenario identity / locale aren't exposed by the current server contract.
    // Hardcoded for now — revisit when the platform exposes a scenario endpoint.
    id: 'retail-uk',
    locale: 'UK',
    customer: adaptCustomer(profile),
    account: adaptAccount(profile),
    jars,
    transactions: serverTxs.map((tx) => adaptTransaction(tx, jarNamesById)),
  };
}
