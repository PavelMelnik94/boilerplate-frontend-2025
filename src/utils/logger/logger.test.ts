import { describe, expect, it, vi } from 'vitest';

import { logger, withLogging } from './logger';

describe('logger', () => {
  it('should log info messages when enabled', () => {
    logger.setEnabled(true);

    const consoleInfoSpy = vi.spyOn(console, 'info');
    logger.info('This is an info message');

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      '%cINFO: This is an info message',
      'background: #2C528C; padding: 0.2rem; border-radius: 0.1rem',
    );

    consoleInfoSpy.mockRestore();
  });

  it('should not log info messages when disabled', () => {
    logger.setEnabled(false);

    const consoleInfoSpy = vi.spyOn(console, 'info');
    logger.info('This is an info message');

    expect(consoleInfoSpy).not.toHaveBeenCalled();

    consoleInfoSpy.mockRestore();
  });

  it('should log error messages when enabled', () => {
    logger.setEnabled(true);

    const consoleErrorSpy = vi.spyOn(console, 'error');
    logger.error('This is an error message');

    expect(consoleErrorSpy).toHaveBeenCalledWith('%cERROR: This is an error message', 'color: red');

    consoleErrorSpy.mockRestore();
  });

  it('should not log error messages when disabled', () => {
    logger.setEnabled(false);

    const consoleErrorSpy = vi.spyOn(console, 'error');
    logger.error('This is an error message');

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});

describe('withLogging', () => {
  it('should not log error messages when no error is thrown', () => {
    logger.setEnabled(true);

    const consoleErrorSpy = vi.spyOn(console, 'error');

    const safeFunction = withLogging(() => 'No error');

    const result = safeFunction();

    expect(result).toBe('No error');
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});

describe('Logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.setEnabled(true);
  });

  it('should log info messages when enabled', () => {
    logger.info('test message');
    expect(console.info).toHaveBeenCalledWith(
      '%cINFO: test message',
      'background: #2C528C; padding: 0.2rem; border-radius: 0.1rem',
    );
  });

  it('should not log when disabled', () => {
    logger.setEnabled(false);
    logger.info('test message');
    logger.warn('test message');
    logger.error('test message');
    logger.log('test message');

    expect(console.info).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log errors with withLogging decorator', () => {
    const error = new Error('Test error');
    const testFn = withLogging(() => {
      throw error;
    });

    const result = testFn();

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith('%cERROR: 🚨🚨🚨 FIRE!!! An error occurred.', 'color: red', error);
  });
});
