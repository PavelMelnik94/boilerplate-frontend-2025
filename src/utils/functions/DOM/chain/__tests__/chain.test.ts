import { describe, expect, it, vi } from 'vitest';

import { chain } from '../chain';

describe('chain', () => {
  // ...existing code...

  describe('error handling and edge cases', () => {
    it('should handle invalid CSS properties safely', () => {
      const element = document.createElement('div');
      const result = chain(element, { silent: true })
        .setStyles({
          // @ts-expect-error testing invalid property
          'invalid-property': 'value',
          backgroundColor: 'red',
        })
        .apply();

      expect(result.style.backgroundColor).toBe('red');
      // @ts-expect-error accessing for test
      expect(result.style.invalidProperty).toBeUndefined();
    });

    it('should handle valid CSS properties', () => {
      const element = document.createElement('div');
      chain(element)
        .setStyles({
          backgroundColor: 'red',
          padding: '10px',
          margin: '5px',
        })
        .apply();

      expect(element.style.backgroundColor).toBe('red');
      expect(element.style.padding).toBe('10px');
      expect(element.style.margin).toBe('5px');
    });

    it('should handle animation abortion', () => {
      const element = document.createElement('div');
      const abortController = new AbortController();

      const chainInstance = chain(element)
        .withAbortController(abortController)
        .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });

      abortController.abort();
      const result = chainInstance.apply();

      expect(result).toBe(element);
    });

    it('should handle cleanup after abort', () => {
      const element = document.createElement('div');
      const listener = vi.fn();

      // @ts-expect-error testing invalid property
      const chainInstance = chain(element).addEventListener('click', listener).abort();

      element.click();
      expect(listener).not.toHaveBeenCalled();
    });

    it('should handle animation completion', async () => {
      const element = document.createElement('div');

      const animation = chain(element)
        .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 100 })
        .apply();

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(animation).toBe(element);
    });
  });
});
