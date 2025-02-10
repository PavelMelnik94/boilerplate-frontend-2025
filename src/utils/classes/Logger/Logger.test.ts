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
