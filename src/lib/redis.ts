import { Redis } from "@upstash/redis";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

/**
 * Fetches data from Redis cache by key. If there's no cached value,
 * calls the `fetcher` function and caches the result for `ttlSec` seconds.
 *
 * If the cached value is corrupted (e.g. invalid JSON), it's cleared
 * and the `fetcher` is called.
 *
 * If Redis errors occur, they're ignored and the fresh data is returned.
 *
 * @param key The Redis key to use for caching
 * @param fetcher The function to call when there's no cached data
 * @param ttlSec The number of seconds to cache the data for (default: 5 minutes)
 * @returns The cached data if available, or the result of calling `fetcher`
 */
export async function cacheData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSec = 300, // default: 5 minutes
): Promise<T> {
  try {
    const cached = await redis.get<string>(key);
    if (cached) {
      try {
        return JSON.parse(cached) as T;
      } catch {
        await redis.del(key); // corrupted cache, clear it
      }
    }

    const result = await fetcher();

    try {
      await redis.set(key, JSON.stringify(result), { ex: ttlSec });
    } catch {
      // ignore Redis errors silently – return fresh data
    }

    return result;
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch data",
      cause: err,
    });
  }
}
