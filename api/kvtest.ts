import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    await kv.set('kvtest:ping', 'pong');
    const val = await kv.get<string>('kvtest:ping');
    return res.status(200).json({ ok: true, val });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack?.split('\n').slice(0, 5) : undefined,
    });
  }
}
