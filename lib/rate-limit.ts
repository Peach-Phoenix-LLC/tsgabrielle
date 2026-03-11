/**
 * Simple in-memory rate limiter for serverless functions.
 * Uses a sliding window approach per IP address.
 *
 * Note: In a multi-instance deployment (e.g. Vercel), each instance
 * has its own memory, so this provides per-instance rate limiting.
 * For stricter limits, consider Vercel's WAF or an external store like Upstash Redis.
 */

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up stale entries periodically to prevent memory leaks
const CLEANUP_INTERVAL = 60_000; // 1 minute
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, value] of rateLimitMap) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetInSeconds: number;
};

export function rateLimit(
  identifier: string,
  { maxRequests = 10, windowMs = 60_000 }: { maxRequests?: number; windowMs?: number } = {}
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: maxRequests - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
  }

  entry.count++;

  if (entry.count > maxRequests) {
    const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000);
    return { success: false, remaining: 0, resetInSeconds };
  }

  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetInSeconds: Math.ceil((entry.resetTime - now) / 1000),
  };
}

/**
 * Get a rate limit identifier from a request.
 * Uses X-Forwarded-For (set by Vercel/proxies) or falls back to a default.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
