import { describe, it, expect, vi, beforeEach } from 'vitest';

import { logger } from '@/utils/logger';

import { chain } from './chain';

vi.mock('@/utils/logger', () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

async function flushPromises() {
  return await new Promise((resolve) => setImmediate(resolve));
}

describe('chain utility', () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement('div');
    vi.clearAllMocks();
  });

  it('should throw error if element is not provided', () => {
    expect(() => chain(null as unknown as HTMLElement)).toThrow('Chain requires a valid HTMLElement');
  });

  describe('class manipulation', () => {
    it('should add classes', () => {
      chain(element).addClass('test', 'demo').apply();
      expect(element.classList.contains('test')).toBe(true);
      expect(element.classList.contains('demo')).toBe(true);
    });

    it('should remove classes', () => {
      element.classList.add('test', 'demo');
      chain(element).removeClass('test', 'demo').apply();
      expect(element.classList.contains('test')).toBe(false);
      expect(element.classList.contains('demo')).toBe(false);
    });

    it('should toggle class', () => {
      chain(element).toggleClass('test').apply();
      expect(element.classList.contains('test')).toBe(true);
      chain(element).toggleClass('test').apply();
      expect(element.classList.contains('test')).toBe(false);
    });

    it('should check if class exists', () => {
      element.classList.add('test');
      const result = chain(element).hasClass('test');
      expect(result).toBe(true);
    });

    it('should replace class', () => {
      element.classList.add('old');
      chain(element).replaceClass('old', 'new').apply();
      expect(element.classList.contains('old')).toBe(false);
      expect(element.classList.contains('new')).toBe(true);
    });
  });

  describe('style manipulation', () => {
    it('should set styles', () => {
      chain(element).setStyles({ color: 'red', backgroundColor: 'blue' }).apply();
      expect(element.style.color).toBe('red');
      expect(element.style.backgroundColor).toBe('blue');
    });

    it('should set size', () => {
      chain(element).setSize('100px', '200px').apply();
      expect(element.style.width).toBe('100px');
      expect(element.style.height).toBe('200px');
    });

    it('should set position', () => {
      chain(element).setPosition('absolute').apply();
      expect(element.style.position).toBe('absolute');
    });

    it('should set coordinates', () => {
      chain(element).setCoords('10px', '20px').apply();
      expect(element.style.top).toBe('10px');
      expect(element.style.left).toBe('20px');
    });
  });

  describe('attribute manipulation', () => {
    it('should set attribute', () => {
      chain(element).setAttribute('data-test', 'value').apply();
      expect(element.getAttribute('data-test')).toBe('value');
    });

    it('should remove attribute', () => {
      element.setAttribute('data-test', 'value');
      chain(element).removeAttribute('data-test').apply();
      expect(element.hasAttribute('data-test')).toBe(false);
    });

    it('should set data attribute', () => {
      chain(element).setData('test', 'value').apply();
      expect(element.getAttribute('data-test')).toBe('value');
    });

    it('should get data attribute', () => {
      element.setAttribute('data-test', 'value');
      const value = chain(element).getData('test');
      expect(value).toBe('value');
    });
  });

  describe('content manipulation', () => {
    it('should set text content', () => {
      chain(element).setContent('test content').apply();
      expect(element.textContent).toBe('test content');
    });

    it('should set HTML content', () => {
      chain(element).setHtml('<span>test</span>').apply();
      expect(element.innerHTML).toBe('<span>test</span>');
    });

    it('should append nodes', () => {
      const span = document.createElement('span');
      chain(element).append(span, 'text').apply();
      expect(element.children.length).toBe(1);
      expect(element.textContent).toBe('text');
    });

    it('should prepend nodes', () => {
      const span = document.createElement('span');
      chain(element).prepend(span, 'text').apply();
      expect(element.children.length).toBe(1);
      expect(element.textContent).toBe('text');
    });

    it('should empty element', () => {
      element.innerHTML = '<span>test</span>';
      chain(element).empty().apply();
      expect(element.children.length).toBe(0);
    });
  });

  describe('visibility manipulation', () => {
    it('should hide element', () => {
      chain(element).hide().apply();
      expect(element.style.display).toBe('none');
    });

    it('should show element', () => {
      element.style.display = 'none';
      chain(element).show().apply();
      expect(element.style.display).toBe('block');
    });

    it('should show element with custom display value', () => {
      chain(element).show('flex').apply();
      expect(element.style.display).toBe('flex');
    });
  });

  describe('animation and transition', () => {
    it('should set up animation', () => {
      const keyframes = [{ opacity: 0 }, { opacity: 1 }];
      const mockAnimate = vi.fn();
      element.animate = mockAnimate;

      chain(element).animate(keyframes, { duration: 1000 }).apply();
      expect(mockAnimate).toHaveBeenCalledWith(keyframes, { duration: 1000 });
    });

    it('should set transition', () => {
      chain(element).transition('all', '0.3s').apply();
      expect(element.style.transition).toBe('all 0.3s');
    });

    it('should handle concurrent animations', () => {
      const element = document.createElement('div');
      const mockAnimate = vi.fn().mockReturnValue({
        finished: Promise.resolve(),
        cancel: vi.fn(),
      });
      element.animate = mockAnimate;

      // Start multiple animations
      const chainInstance = chain(element)
        .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 })
        .animate([{ scale: 0 }, { scale: 1 }], { duration: 500 });

      chainInstance.apply();

      expect(mockAnimate).toHaveBeenCalledTimes(2);
    });

    it('should handle animation errors gracefully', async () => {
      const element = document.createElement('div');
      const error = new Error('Animation failed');
      const cancelSpy = vi.fn();
      let rejectFn: (error: Error) => void;
      const animationPromise = new Promise<void>((_, reject) => {
        rejectFn = reject;
      });

      const mockAnimate = vi.fn().mockReturnValue({
        finished: animationPromise,
        cancel: cancelSpy,
      });
      element.animate = mockAnimate;

      chain(element, { silent: false })
        .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 })
        .apply();

      // Trigger animation error
      rejectFn!(error);

      // Use flushPromises to ensure all promises are resolved
      await flushPromises();

      expect(logger.error).toHaveBeenCalledWith('Animation failed', error);
      expect(cancelSpy).toHaveBeenCalled();
    });
  });

  describe('abort controller', () => {
    it('should abort animations and event listeners', () => {
      const controller = new AbortController();
      const abortSpy = vi.spyOn(controller, 'abort');

      // Need to create a chain with the controller first
      const chainInstance = chain(element).withAbortController(controller);

      // Add some event listener to make sure abort is called
      chainInstance.addEventListener('click', () => {}, { signal: controller.signal }).apply();

      // Create a new chain with the same controller and abort
      chain(element).withAbortController(controller).abort().apply();

      expect(abortSpy).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should log error in non-silent mode', () => {
      // Create an object that throws when any property is accessed
      const troubleMaker = {};
      Object.defineProperty(troubleMaker, 'toString', {
        get: () => {
          throw new TypeError('Intentional error');
        },
      });

      // @ts-expect-error testing invalid property
      chain(element, { silent: false }).setStyles({ backgroundColor: troubleMaker }).apply();

      expect(logger.error).toHaveBeenCalledWith('Failed to set styles', expect.any(TypeError));
    });

    it('should not log error in silent mode', () => {
      chain(element, { silent: true }).setStyles({ display: undefined }).apply();

      expect(logger.error).not.toHaveBeenCalled();
    });
  });

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
      // @ts-expect-error testing invalid property
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

    it('should handle errors in style application and continue chain', () => {
      const element = document.createElement('div');
      const error = new Error('Style error');
      Object.defineProperty(element.style, 'setProperty', {
        value: () => {
          throw error;
        },
      });

      const result = chain(element, { silent: false }).setStyles({ backgroundColor: 'red' }).addClass('test').apply();

      expect(result.classList.contains('test')).toBe(true);
      expect(logger.error).toHaveBeenCalledWith('Failed to set CSS property backgroundColor: red', error);
    });

    it('should handle complete chain failure gracefully', async () => {
      const element = document.createElement('div');
      const error = new Error('Event listener error');
      const listener = vi.fn().mockImplementation(() => {
        throw error;
      });

      chain(element, { silent: false }).addEventListener('click', listener).apply();

      element.dispatchEvent(new Event('click'));
      // Use flushPromises to ensure all promises are resolved
      await flushPromises();

      expect(logger.error).toHaveBeenCalledWith('Event listener error', error);
      expect(listener).toHaveBeenCalled();
    });

    it('should properly cleanup resources on error', async () => {
      const element = document.createElement('div');
      const controller = new AbortController();
      const cancelSpy = vi.fn();
      const error = new Error('Animation failed');

      const mockAnimate = vi.fn().mockReturnValue({
        finished: Promise.reject(error),
        cancel: cancelSpy,
      });
      element.animate = mockAnimate;

      chain(element)
        .withAbortController(controller)
        .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 })
        .abort()
        .apply();

      // Use flushPromises to ensure all promises are resolved
      await flushPromises();

      expect(cancelSpy).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith('Animation failed', error);
    });
  });
});
