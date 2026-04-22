import type { VercelRequest, VercelResponse } from '@vercel/node';

// Standalone — no _lib imports, no KV. Confirms the serverless runtime loads
// and that env vars are readable. Diagnostic for sub-prompt 1 shakeout.
export default function handler(_req: VercelRequest, res: VercelResponse) {
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
