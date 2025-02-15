import { describe, expect, it, vi } from 'vitest'

import { logger, Logger, withLogging } from './logger'

describe('logger', () => {
  it('should log info messages when enabled', () => {
    logger.setEnabled(true)

    const consoleInfoSpy = vi.spyOn(console, 'info')
    logger.info('This is an info message')

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      '%cINFO: This is an info message',
      'background: #2C528C; padding: 0.2rem; border-radius: 0.1rem',
    )

    consoleInfoSpy.mockRestore()
  })

  it('should not log info messages when disabled', () => {
    logger.setEnabled(false)

    const consoleInfoSpy = vi.spyOn(console, 'info')
    logger.info('This is an info message')

    expect(consoleInfoSpy).not.toHaveBeenCalled()

    consoleInfoSpy.mockRestore()
  })

  it('should log error messages when enabled', () => {
    logger.setEnabled(true)

    const consoleErrorSpy = vi.spyOn(console, 'error')
    logger.error('This is an error message')

    expect(consoleErrorSpy).toHaveBeenCalledWith('%cERROR: This is an error message', 'color: red')

    consoleErrorSpy.mockRestore()
  })

  it('should not log error messages when disabled', () => {
    logger.setEnabled(false)

    const consoleErrorSpy = vi.spyOn(console, 'error')
    logger.error('This is an error message')

    expect(consoleErrorSpy).not.toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})

describe('withLogging', () => {
  it('should not log error messages when no error is thrown', () => {
    logger.setEnabled(true)

    const consoleErrorSpy = vi.spyOn(console, 'error')

    const safeFunction = withLogging(() => 'No error')

    const result = safeFunction()

    expect(result).toBe('No error')
    expect(consoleErrorSpy).not.toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})

describe('logger test', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    logger.setEnabled(true)
  })

  it('should log info messages when enabled', () => {
    logger.info('test message')
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledWith(
      '%cINFO: test message',
      'background: #2C528C; padding: 0.2rem; border-radius: 0.1rem',
    )
  })

  it('should not log when disabled', () => {
    logger.setEnabled(false)
    logger.info('test message')
    logger.warn('test message')
    logger.error('test message')
    logger.log('test message')

    // eslint-disable-next-line no-console
    expect(console.info).not.toHaveBeenCalled()
    expect(console.warn).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
  })

  it('should log errors with withLogging decorator', () => {
    const error = new Error('Test error')
    const testFn = withLogging(() => {
      throw error
    })

    const result = testFn()

    expect(result).toBeUndefined()
    expect(console.error).toHaveBeenCalledWith('%cERROR: 🚨🚨🚨 FIRE!!! An error occurred.', 'color: red', error)
  })

  describe('logging methods', () => {
    it('should handle log method with different parameters', () => {
      const consoleSpy = vi.spyOn(console, 'info')

      logger.log('test message')
      expect(consoleSpy).toHaveBeenCalledWith(
        '%cLOG: test message',
        'font-weight: bold; background:rgb(44, 140, 92); padding: 0.2rem; border-radius: 0.1rem',
      )

      // @ts-expect-error testing with additional data
      logger.log('test message', { data: 'test' })
      expect(consoleSpy).toHaveBeenLastCalledWith(
        '%cLOG: test message',
        'font-weight: bold; background:rgb(44, 140, 92); padding: 0.2rem; border-radius: 0.1rem',
        { data: 'test' },
      )
    })

    it('should handle warn method with different parameters', () => {
      const consoleSpy = vi.spyOn(console, 'warn')

      logger.warn('test warning')
      expect(consoleSpy).toHaveBeenCalledWith('%cWARN: test warning', 'color: orange;')

      // @ts-expect-error testing with additional data
      logger.warn('test warning', new Error('test error'))
      expect(consoleSpy).toHaveBeenLastCalledWith('%cWARN: test warning', 'color: orange;', new Error('test error'))
    })

    it('should handle singleton pattern correctly', () => {
      const logger2 = Logger.getInstance()
      expect(logger2).toBe(logger)
    })
  })

  describe('withLogging decorator', () => {
    it('should handle successful function execution', () => {
      const successFn = withLogging(() => 'success')
      const result = successFn()
      expect(result).toBe('success')
    })

    it('should handle undefined return values', () => {
      const voidFn = withLogging(() => {
        // Function returns undefined
      })
      const result = voidFn()
      expect(result).toBeUndefined()
    })
  })
})
