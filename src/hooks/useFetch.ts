import { useEffect, useState } from 'react';

const cache = new Map<string, unknown>();

export function clearFetchCache(): void {
  cache.clear();
}

/**
 * Runs an async fetcher once per cache key and tracks its data, loading and
 * error state. A successful result is cached under `key`; later mounts with
 * the same key get it straight away without a request. Errors aren't cached,
 * so the next mount tries again.
 *
 * Wrap the fetcher in `useCallback` with its own dependencies; a new
 * function on every render would re-run the effect on every render.
 *
 * @param key - Unique name for this data, e.g. `"ingredients"`.
 * @param fetcher - Async function returning the data, e.g. `() => getIngredients(token)`.
 * @returns `data` (null until the first success), `error` (whatever was thrown),
 * `loading`, and `setData` to update the data locally.
 */
export function useFetch<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(
    () => (cache.get(key) as T | undefined) ?? null
  );
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(() => !cache.has(key));

  useEffect(() => {
    if (cache.has(key)) return;

    fetcher()
      .then((result) => {
        cache.set(key, result);
        setData(result);
        setError(null);
        setLoading(false);
      })
      .catch((caught: unknown) => {
        setError(caught);
        setLoading(false);
      });
  }, [key, fetcher]);

  return { data, error, loading, setData };
}
