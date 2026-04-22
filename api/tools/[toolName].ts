import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { toolName } = req.query as { toolName: string };
  await kv.set('dyn:test', 'dyn-ok');
  const val = await kv.get<string>('dyn:test');
  return res.status(200).json({ toolName, kvVal: val });
}
