import type { VercelRequest, VercelResponse } from '@vercel/node';
import { siblingFn } from './_sibling';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { toolName } = req.query as { toolName: string };
  return res.status(200).json({ toolName, sibling: siblingFn() });
}
