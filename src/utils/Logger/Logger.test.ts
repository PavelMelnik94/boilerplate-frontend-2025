import { describe, it, vi, expect } from 'vitest';
import { Logger, withLogging } from './Logger';

describe('Logger', () => {
  it('should log info messages when enabled', () => {
    const logger = Logger.getInstance();
    logger.setEnabled(true);

    const consoleInfoSpy = vi.spyOn(console, 'info');
    logger.info('This is an info message');

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      '%cINFO: This is an info message',
      'background: #2C528C; padding: 0.2rem; border-radius: 0.1rem'
    );

    consoleInfoSpy.mockRestore();
  });

  it('should not log info messages when disabled', () => {
    const logger = Logger.getInstance();
    logger.setEnabled(false);

    const consoleInfoSpy = vi.spyOn(console, 'info');
    logger.info('This is an info message');

    expect(consoleInfoSpy).not.toHaveBeenCalled();

    consoleInfoSpy.mockRestore();
  });

  it('should log error messages when enabled', () => {
    const logger = Logger.getInstance();
    logger.setEnabled(true);

    const consoleErrorSpy = vi.spyOn(console, 'error');
    logger.error('This is an error message');

    expect(consoleErrorSpy).toHaveBeenCalledWith('%cERROR: This is an error message', 'color: red');

    consoleErrorSpy.mockRestore();
  });

  it('should not log error messages when disabled', () => {
    const logger = Logger.getInstance();
    logger.setEnabled(false);

    const consoleErrorSpy = vi.spyOn(console, 'error');
    logger.error('This is an error message');

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});

describe('withLogging', () => {
  it('should log error messages when an error is thrown', () => {
    const logger = Logger.getInstance();
    logger.setEnabled(true);

    const consoleErrorSpy = vi.spyOn(console, 'error');

    const faultyFunction = withLogging(() => {
      throw new Error('Test error');
    });

    faultyFunction();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '%cERROR: 🚨🚨🚨 FIRE!!! An error occurred.',
      'color: red',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it('should not log error messages when no error is thrown', () => {
    const logger = Logger.getInstance();
    logger.setEnabled(true);

    const consoleErrorSpy = vi.spyOn(console, 'error');

    const safeFunction = withLogging(() => 'No error');

    const result = safeFunction();

    expect(result).toBe('No error');
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
