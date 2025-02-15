import { describe, expect, it } from 'vitest'

import { tryit, tryitAsync } from './try-it'

describe('tryit', () => {
  it('should return data and null error on successful execution', () => {
    const result = tryit(() => 'success')
    expect(result.data).toBe('success')
    expect(result.err).toBeNull()
  })

  it('should return error and null data when function throws', () => {
    const result = tryit(() => {
      throw new Error('test error')
    })
    expect(result.data).toBeNull()
    expect(result.err).toBeInstanceOf(Error)
    expect(result.err?.message).toBe('test error')
  })

  it('should handle JSON parsing success', () => {
    const result = tryit(() => JSON.parse('{"name": "John"}') as { name: string })
    expect(result.data).toEqual({ name: 'John' })
    expect(result.err).toBeNull()
  })

  it('should handle JSON parsing error', () => {
    const result = tryit(() => JSON.parse('invalid json') as { name: string })
    expect(result.data).toBeNull()
    expect(result.err).toBeInstanceOf(Error)
  })

  it('should handle async function execution', () => {
    const result = tryit(async () => Promise.resolve('async success'))
    expect(result.data).toBeInstanceOf(Promise)
    expect(result.err).toBeNull()
  })

  it('should handle undefined return', () => {
    const result = tryit(() => {})
    expect(result.data).toBeUndefined()
    expect(result.err).toBeNull()
  })
})

describe('tryit test case 2', () => {
  it('should return data on successful execution', () => {
    const result = tryit(() => 'success')
    expect(result).toEqual({ err: null, data: 'success' })
  })

  it('should return error on failed execution', () => {
    const error = new Error('test error')
    const result = tryit(() => {
      throw error
    })
    expect(result).toEqual({ err: error, data: null })
  })
})

describe('tryitAsync', () => {
  it('should return data on successful async execution', async () => {
    const result = await tryitAsync(async () => 'success')
    expect(result).toEqual({ err: null, data: 'success' })
  })

  it('should return error on failed async execution', async () => {
    const error = new Error('test error')
    const result = await tryitAsync(async () => {
      throw error
    })
    expect(result).toEqual({ err: error, data: null })
  })

  it('should handle Promise rejection', async () => {
    const error = new Error('promise rejection')
    const result = await tryitAsync(async () => Promise.reject(error))
    expect(result).toEqual({ err: error, data: null })
  })
})
