import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { DemoState } from '../_lib/types';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { toolName } = req.query as { toolName: string };
  const _typecheck: DemoState | null = null;
  return res.status(200).json({ toolName, typed: _typecheck });
}
