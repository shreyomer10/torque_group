/**
 * Lightweight serverless-friendly rate limiter.
 *
 * No external service required. Uses an in-memory Map scoped to each
 * Vercel serverless instance. Vercel reuses instances opportunistically,
 * so this is effective for casual abuse but NOT a hard ceiling — Resend's
 * per-domain limits are the real backstop.
 *
 * To upgrade to a global, durable limit later, swap this file for
 * @upstash/ratelimit + Upstash Redis without changing callers.
 */

type Entry = { count: number; resetAt: number };

const BUCKET = new Map<string, Entry>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export type RateResult = { ok: boolean; remaining: number; resetAt: number };

export function checkRateLimit(key: string): RateResult {
  const now = Date.now();
  const entry = BUCKET.get(key);

  if (!entry || entry.resetAt < now) {
    BUCKET.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: LIMIT - 1, resetAt: now + WINDOW_MS };
  }

  if (entry.count >= LIMIT) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { ok: true, remaining: LIMIT - entry.count, resetAt: entry.resetAt };
}

/** Best-effort cleanup so the Map doesn't grow unbounded per warm instance. */
function gc() {
  const now = Date.now();
  for (const [k, v] of BUCKET) {
    if (v.resetAt < now) BUCKET.delete(k);
  }
}
setInterval(gc, 10 * 60 * 1000).unref?.();
