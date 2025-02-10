import { describe, expect, it } from 'vitest';

import { tryit } from './try-it';

describe('tryit', () => {
  it('should return data and null error on successful execution', () => {
    const result = tryit(() => 'success');
    expect(result.data).toBe('success');
    expect(result.err).toBeNull();
  });

  it('should return error and null data when function throws', () => {
    const result = tryit(() => {
      throw new Error('test error');
    });
    expect(result.data).toBeNull();
    expect(result.err).toBeInstanceOf(Error);
    expect(result.err?.message).toBe('test error');
  });

  it('should handle JSON parsing success', () => {
    const result = tryit(() => JSON.parse('{"name": "John"}'));
    expect(result.data).toEqual({ name: 'John' });
    expect(result.err).toBeNull();
  });

  it('should handle JSON parsing error', () => {
    const result = tryit(() => JSON.parse('invalid json'));
    expect(result.data).toBeNull();
    expect(result.err).toBeInstanceOf(Error);
  });

  it('should handle async function execution', () => {
    const result = tryit(() => Promise.resolve('async success'));
    expect(result.data).toBeInstanceOf(Promise);
    expect(result.err).toBeNull();
  });

  it('should handle undefined return', () => {
    const result = tryit(() => {});
    expect(result.data).toBeUndefined();
    expect(result.err).toBeNull();
  });
});
