import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getState } from '../_lib/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — tighten later. Allows same-origin deploy plus localhost during dev.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { toolName } = req.query as { toolName: string };

  // Diagnostic: no-KV tool to verify routing + function-load is healthy.
  if (toolName === 'diag') {
    return res.status(200).json({
      ok: true,
      env: {
        KV_REST_API_URL: !!process.env.KV_REST_API_URL,
        KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
        UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
        KV_URL: !!process.env.KV_URL,
      },
    });
  }

  try {
    switch (toolName) {
      case 'get-customer-profile':
        return handleGetCustomerProfile(req, res);
      case 'get-customer-jars':
        return handleGetCustomerJars(req, res);
      case 'get-customer-transactions':
        return handleGetCustomerTransactions(req, res);
      default:
        return res.status(404).json({ error: `Tool not implemented: ${toolName}` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Internal error',
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}

async function handleGetCustomerProfile(_req: VercelRequest, res: VercelResponse) {
  const state = await getState();
  return res.status(200).json({
    data: {
      customerId: state.customer.customerId,
      firstName: state.customer.firstName,
      lastName: state.customer.lastName,
      bankAccount: {
        bankAccountId: state.bankAccount.bankAccountId,
        name: state.bankAccount.name,
        balance: state.bankAccount.balance,
        sortCode: state.bankAccount.paymentIdentifiers.sortCode,
        accountNumberLast4: state.bankAccount.paymentIdentifiers.accountNumber.slice(-4),
      },
    },
  });
}

async function handleGetCustomerJars(_req: VercelRequest, res: VercelResponse) {
  const state = await getState();
  return res.status(200).json({ data: state.jars });
}

async function handleGetCustomerTransactions(req: VercelRequest, res: VercelResponse) {
  const state = await getState();
  const body = (req.body ?? {}) as { jarId?: string };
  const txs = body.jarId
    ? state.transactions.filter((t) => t.jarId === body.jarId)
    : state.transactions;
  return res.status(200).json({ data: txs });
}
