import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';
import { initialState } from './_lib/seed';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    await kv.set('kvtest:ping', 'pong');
    const val = await kv.get<string>('kvtest:ping');
    return res.status(200).json({
      ok: true,
      val,
      seedFirstName: initialState().customer.firstName,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
