import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import './setup-test-env';

// Global settings
beforeAll(() => {
  // Disable console warnings during tests
  vi.spyOn(console, 'warn').mockImplementation(() => {});

  // Set default viewport size
  Object.defineProperty(globalThis.window, 'innerWidth', {
    value: 1024 /* *ANCHOR */,
  });
  Object.defineProperty(globalThis.window, 'innerHeight', {
    value: 768 /* *ANCHOR */,
  });

  // Set language settings
  Object.defineProperty(navigator, 'language', {
    value: 'en-US' /* *ANCHOR */,
  });
});

// Cleanup after each test
afterEach(() => {
  // Clear all mocks
  vi.clearAllMocks();

  // Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();

  // Reset URL
  globalThis.window.history.pushState({}, '', '/');

  // Clear body of added elements
  document.body.innerHTML = '';

  // Reset all timers
  vi.clearAllTimers();
});

// Cleanup after all tests
afterAll(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// Global test utilities
declare global {
  var sleep: (ms: number) => Promise<void>;
}

globalThis.sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Disable animations
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
