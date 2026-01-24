// Simple in-memory rate limiting for contact form
// For production with multiple servers, consider using Redis or Upstash

const rateLimit = new Map<string, { count: number; resetAt: number }>();

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (e.g., IP address, email)
 * @param limit - Maximum number of requests allowed in the time window
 * @param windowMs - Time window in milliseconds
 * @returns true if request is allowed, false if rate limit exceeded
 */
export function checkRateLimit(
  identifier: string, 
  limit: number = 5, 
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  // Clean up old entries periodically (simple cleanup)
  if (rateLimit.size > 10000) {
    const entries = Array.from(rateLimit.entries());
    entries.forEach(([key, value]) => {
      if (now > value.resetAt) {
        rateLimit.delete(key);
      }
    });
  }

  // No record or window expired - allow request
  if (!record || now > record.resetAt) {
    rateLimit.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }

  // Rate limit exceeded
  if (record.count >= limit) {
    return false;
  }

  // Increment counter and allow request
  record.count++;
  return true;
}

/**
 * Get remaining time until rate limit resets
 * @param identifier - Unique identifier
 * @returns Seconds until reset, or 0 if no limit active
 */
export function getRateLimitReset(identifier: string): number {
  const record = rateLimit.get(identifier);
  if (!record) return 0;
  
  const now = Date.now();
  if (now > record.resetAt) return 0;
  
  return Math.ceil((record.resetAt - now) / 1000);
}
