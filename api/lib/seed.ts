// TODO: refactor transaction timestamps to day-offsets (daysAgo: 0, 1, 2...)
// instead of absolute dates anchored to DEMO_TODAY, so "TODAY" / "YESTERDAY"
// labels stay correct whenever the demo is viewed.

import type { DemoState } from './types';

const CUSTOMER_ID = '11111111-1111-4111-8111-111111111111';
const BANK_ACCOUNT_ID = '22222222-2222-4222-8222-222222222222';
const JAR_EMERGENCY_ID = '33333333-3333-4333-8333-333333333331';
const JAR_BARCELONA_ID = '33333333-3333-4333-8333-333333333332';
const JAR_WEDDING_ID = '33333333-3333-4333-8333-333333333333';

const CREATED_TS = '2025-09-01T10:00:00Z';
const DEMO_TODAY = '2026-04-21T12:00:00Z';

export function initialState(): DemoState {
  return {
    customer: {
      customerId: CUSTOMER_ID,
      firstName: 'Emma',
      lastName: 'Hughes',
    },
    bankAccount: {
      bankAccountId: BANK_ACCOUNT_ID,
      bankAccountType: 'PERSONAL_CURRENT',
      status: 'ACTIVE',
      owners: [CUSTOMER_ID],
      balance: {
        // Reserved = sum of jar balances (1200 + 450 + 2800) = 4450.00
        // Available = 4287.50 (the UI hero); total = available + reserved = 8737.50
        total: '8737.50',
        reserved: '4450.00',
        currency: 'GBP',
      },
      paymentIdentifiers: {
        sortCode: '04-00-04',
        accountNumber: '12344421',
      },
      name: 'Everyday account',
    },
    jars: [
      {
        jarId: JAR_EMERGENCY_ID,
        name: 'Emergency fund',
        bankAccountId: BANK_ACCOUNT_ID,
        balance: '1200.00',
        createdTimestamp: CREATED_TS,
        lastUpdatedTimestamp: CREATED_TS,
        dynamicAttributes: {
          targetBalance: '3000.00',
          accent: 'blue',
          icon: 'shield',
        },
      },
      {
        jarId: JAR_BARCELONA_ID,
        name: 'Barcelona trip',
        bankAccountId: BANK_ACCOUNT_ID,
        balance: '450.00',
        createdTimestamp: CREATED_TS,
        lastUpdatedTimestamp: '2026-04-20T10:15:00Z',
        dynamicAttributes: {
          targetBalance: '1200.00',
          accent: 'teal',
          icon: 'plane',
        },
      },
      {
        jarId: JAR_WEDDING_ID,
        name: 'Wedding',
        bankAccountId: BANK_ACCOUNT_ID,
        balance: '2800.00',
        createdTimestamp: CREATED_TS,
        lastUpdatedTimestamp: CREATED_TS,
        dynamicAttributes: {
          targetBalance: '10000.00',
          accent: 'gold',
          icon: 'heart',
        },
      },
    ],
    transactions: [
      {
        transactionId: '44444444-4444-4444-8444-000000000001',
        customerId: CUSTOMER_ID,
        bankAccountId: BANK_ACCOUNT_ID,
        jarId: null,
        direction: 'out',
        amount: '42.18',
        currency: 'GBP',
        merchantName: 'Tesco',
        category: 'Groceries',
        createdTimestamp: '2026-04-21T14:30:00Z',
        type: 'card',
      },
      {
        transactionId: '44444444-4444-4444-8444-000000000002',
        customerId: CUSTOMER_ID,
        bankAccountId: BANK_ACCOUNT_ID,
        jarId: null,
        direction: 'out',
        amount: '6.45',
        currency: 'GBP',
        merchantName: 'Pret a Manger',
        category: 'Eating out',
        createdTimestamp: '2026-04-21T12:45:00Z',
        type: 'card',
      },
      {
        transactionId: '44444444-4444-4444-8444-000000000003',
        customerId: CUSTOMER_ID,
        bankAccountId: BANK_ACCOUNT_ID,
        jarId: null,
        direction: 'out',
        amount: '14.90',
        currency: 'GBP',
        merchantName: 'Uber',
        category: 'Transport',
        createdTimestamp: '2026-04-20T18:20:00Z',
        type: 'card',
      },
      {
        transactionId: '44444444-4444-4444-8444-000000000004',
        customerId: CUSTOMER_ID,
        bankAccountId: BANK_ACCOUNT_ID,
        jarId: null,
        direction: 'in',
        amount: '2840.00',
        currency: 'GBP',
        merchantName: 'Acme Ltd — Salary',
        category: 'Income',
        createdTimestamp: '2026-04-21T06:00:00Z',
        type: 'salary',
      },
      // Barcelona top-up: two-sided ledger entry.
      // Outgoing leg on the current account:
      {
        transactionId: '44444444-4444-4444-8444-000000000005',
        customerId: CUSTOMER_ID,
        bankAccountId: BANK_ACCOUNT_ID,
        jarId: null,
        direction: 'out',
        amount: '50.00',
        currency: 'GBP',
        merchantName: 'Barcelona trip top-up',
        category: 'Jar top-up',
        createdTimestamp: '2026-04-20T10:15:00Z',
        type: 'jar-transfer',
      },
      // Incoming leg on the Barcelona jar:
      {
        transactionId: '44444444-4444-4444-8444-000000000006',
        customerId: CUSTOMER_ID,
        bankAccountId: BANK_ACCOUNT_ID,
        jarId: JAR_BARCELONA_ID,
        direction: 'in',
        amount: '50.00',
        currency: 'GBP',
        merchantName: 'Barcelona trip top-up',
        category: 'Jar top-up',
        createdTimestamp: '2026-04-20T10:15:00Z',
        type: 'jar-transfer',
      },
    ],
  };
}

// Anchor exposed for callers that want the demo "today" (tests, future day-offset refactor).
export const SEED_DEMO_TODAY = DEMO_TODAY;
