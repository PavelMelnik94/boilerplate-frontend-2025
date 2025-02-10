interface TryitResult<T> {
  err: Error | null;
  data: T | null;
}

/**
 * Executes a function and returns a structured result containing either the successful data or an error.
 *
 * @template T - The type of value that the function returns
 * @param {() => T} fn - The function to execute
 * @returns {TryitResult<T>} An object containing either:
 *   - On success: { err: null, data: T }
 *   - On error: { err: Error, data: null }
 *
 * @example
 * ```typescript
 * const result = tryit(() => JSON.parse('{"name": "John"}'));
 * if (result.err) {
 *   console.error('Parsing failed:', result.err);
 * } else {
 *   console.log('Parsed data:', result.data);
 * }
 * ```
 *
 * @throws Never - All exceptions are caught and returned in the result object
 * @since 1.0.0
 */
const tryit = <T>(fn: () => T): TryitResult<T> => {
  try {
    const data = fn();
    return { err: null, data };
  } catch (error) {
    return { err: error as Error, data: null };
  }
};

export { tryit };
