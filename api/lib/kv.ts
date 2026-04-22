// Single shared demo state — no per-user separation today.
// Sales reps share one KV key; /api/reset (sub-prompt 5) re-seeds between runs.

import { kv } from '@vercel/kv';
import type { DemoState } from './types';
import { initialState } from './seed';

const STATE_KEY = 'scenario:demo';

export async function getState(): Promise<DemoState> {
  const existing = await kv.get<DemoState>(STATE_KEY);
  if (existing) return existing;
  const seed = initialState();
  await kv.set(STATE_KEY, seed);
  return seed;
}

export async function setState(state: DemoState): Promise<void> {
  await kv.set(STATE_KEY, state);
}

export async function resetState(): Promise<DemoState> {
  const seed = initialState();
  await kv.set(STATE_KEY, seed);
  return seed;
}
