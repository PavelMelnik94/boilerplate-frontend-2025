import { beforeEach, describe, expect, it, vi } from 'vitest';

import { logger, withLogging, Logger } from '../logger';

describe('Logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.setEnabled(true);
  });

  describe('logging methods', () => {
    it('should handle log method with different parameters', () => {
      const consoleSpy = vi.spyOn(console, 'info');

      logger.log('test message');
      expect(consoleSpy).toHaveBeenCalledWith(
        '%cLOG: test message',
        'font-weight: bold; background:rgb(44, 140, 92); padding: 0.2rem; border-radius: 0.1rem',
      );

      // @ts-expect-error testing with additional data
      logger.log('test message', { data: 'test' });
      expect(consoleSpy).toHaveBeenLastCalledWith(
        '%cLOG: test message',
        'font-weight: bold; background:rgb(44, 140, 92); padding: 0.2rem; border-radius: 0.1rem',
        { data: 'test' },
      );
    });

    it('should handle warn method with different parameters', () => {
      const consoleSpy = vi.spyOn(console, 'warn');

      logger.warn('test warning');
      expect(consoleSpy).toHaveBeenCalledWith('%cWARN: test warning', 'color: orange;');

      // @ts-expect-error testing with additional data
      logger.warn('test warning', new Error('test error'));
      expect(consoleSpy).toHaveBeenLastCalledWith('%cWARN: test warning', 'color: orange;', new Error('test error'));
    });

    it('should handle singleton pattern correctly', () => {
      const logger2 = Logger.getInstance();
      expect(logger2).toBe(logger);
    });
  });

  describe('withLogging decorator', () => {
    it('should handle successful function execution', () => {
      const successFn = withLogging(() => 'success');
      const result = successFn();
      expect(result).toBe('success');
    });

    it('should handle undefined return values', () => {
      const voidFn = withLogging(() => {
        // Function returns undefined
      });
      const result = voidFn();
      expect(result).toBeUndefined();
    });
  });
});
