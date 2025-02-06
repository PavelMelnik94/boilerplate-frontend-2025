/* eslint-disable sonarjs/deprecation */
import { vi } from 'vitest';

const emptyRecords = (): [] => [];
const falseFn = (): boolean => false;

// Mock IntersectionObserver

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [];

  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(emptyRecords);
  unobserve = vi.fn();
}

globalThis.IntersectionObserver = IntersectionObserverMock;

// Mock ResizeObserver
class ResizeObserverMock implements ResizeObserver {
  disconnect = vi.fn();
  observe = vi.fn();
  unobserve = vi.fn();
}

globalThis.ResizeObserver = ResizeObserverMock;

// Mock AbortController
class AbortControllerMock implements AbortController {
  signal = {
    aborted: false,
    reason: undefined,
    throwIfAborted: () => {},
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onabort: null,
  } as unknown as AbortSignal;
  abort = vi.fn();
}

globalThis.AbortController = AbortControllerMock;

// Mock Performance
const performanceMock = {
  now: vi.fn(() => Date.now()),
  mark: vi.fn(),
  measure: vi.fn(),
  clearMarks: vi.fn(),
  clearMeasures: vi.fn(),
  getEntriesByName: vi.fn(() => []),
  getEntriesByType: vi.fn(() => []),
  getEntries: vi.fn(() => []),
  timing: {
    connectEnd: 0,
    connectStart: 0,
    domComplete: 0,
    domContentLoadedEventEnd: 0,
    domContentLoadedEventStart: 0,
    domInteractive: 0,
    domLoading: 0,
    domainLookupEnd: 0,
    domainLookupStart: 0,
    fetchStart: 0,
    loadEventEnd: 0,
    loadEventStart: 0,
    navigationStart: 0,
    redirectEnd: 0,
    redirectStart: 0,
    requestStart: 0,
    responseEnd: 0,
    responseStart: 0,
    secureConnectionStart: 0,
    unloadEventEnd: 0,
    unloadEventStart: 0,
  } as PerformanceTiming,
  timeOrigin: 0,
  eventCounts: new Map(),
  navigation: {} as PerformanceNavigation,
  onresourcetimingbufferfull: null,
  toJSON: vi.fn(() => ({})),
  memory: {} as Record<string, unknown>,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  clearResourceTimings: vi.fn(),
  setResourceTimingBufferSize: vi.fn(),
};

globalThis.performance = performanceMock;

const createObjectURL = (): string => 'blob:mock-url';
// Mock URL
class URLMock extends URL {
  static readonly createObjectURL = vi.fn(createObjectURL);
  static readonly revokeObjectURL = vi.fn();
}

globalThis.URL = URLMock;

// Mock Blob
class BlobMock extends Blob {
  static readonly override = vi.fn();
}

globalThis.Blob = BlobMock;

// Mock File
class FileMock extends File {
  static readonly override = vi.fn();
}

globalThis.File = FileMock;

// Mock FormData
class FormDataMock implements FormData {
  append = vi.fn();
  delete = vi.fn();
  get = vi.fn();
  getAll = vi.fn(emptyRecords);
  has = vi.fn(falseFn);
  set = vi.fn();
  forEach = vi.fn();

  *entries(): IterableIterator<[string, FormDataEntryValue]> {
    yield* [];
  }

  *keys(): IterableIterator<string> {
    yield* [];
  }

  *values(): IterableIterator<FormDataEntryValue> {
    yield* [];
  }

  *[Symbol.iterator](): IterableIterator<[string, FormDataEntryValue]> {
    yield* [];
  }
}

globalThis.FormData = FormDataMock;

// Mock WebSocket
class WebSocketMock implements WebSocket {
  static readonly CONNECTING = 0 as const;
  static readonly OPEN = 1 as const;
  static readonly CLOSING = 2 as const;
  static readonly CLOSED = 3 as const;

  CONNECTING = 0 as const;
  OPEN = 1 as const;
  CLOSING = 2 as const;
  CLOSED = 3 as const;

  binaryType: BinaryType = 'blob';
  bufferedAmount = 0;
  extensions = '';
  protocol = '';
  readyState = WebSocketMock.CLOSED;
  url = '';

  onclose = null;
  onerror = null;
  onmessage = null;
  onopen = null;

  close = vi.fn();
  send = vi.fn();
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  dispatchEvent = vi.fn();
}

globalThis.WebSocket = WebSocketMock;

// Mock History API
const historyMock = {
  pushState: vi.fn(),
  replaceState: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  state: null,
};

Object.defineProperty(globalThis, 'history', { value: historyMock });

// Mock Location
const locationMock = {
  hash: '',
  host: 'localhost',
  hostname: 'localhost',
  href: 'http://localhost',
  origin: 'http://localhost',
  pathname: '/',
  port: '',
  protocol: 'http:',
  search: '',
  assign: vi.fn(),
  reload: vi.fn(),
  replace: vi.fn(),
};

Object.defineProperty(globalThis, 'location', { value: locationMock });

// Mock MutationObserver
class MutationObserverMock implements MutationObserver {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(emptyRecords);
}

globalThis.MutationObserver = MutationObserverMock;

// Mock Selection API
const selectionMock = {
  anchorNode: null,
  anchorOffset: 0,
  focusNode: null,
  focusOffset: 0,
  isCollapsed: true,
  rangeCount: 0,
  type: 'None',
  addRange: vi.fn(),
  collapse: vi.fn(),
  collapseToEnd: vi.fn(),
  collapseToStart: vi.fn(),
  containsNode: vi.fn(() => false),
  deleteFromDocument: vi.fn(),
  empty: vi.fn(),
  extend: vi.fn(),
  getRangeAt: vi.fn(),
  removeAllRanges: vi.fn(),
  removeRange: vi.fn(),
  selectAllChildren: vi.fn(),
  setBaseAndExtent: vi.fn(),
  toString: vi.fn(() => ''),
};

Object.defineProperty(globalThis, 'getSelection', {
  value: () => selectionMock,
});

// Mock crypto
const cryptoMock = {
  getRandomValues: vi.fn((array) => array),
  subtle: {
    encrypt: vi.fn(),
    decrypt: vi.fn(),
    sign: vi.fn(),
    verify: vi.fn(),
    digest: vi.fn(),
  },
};

Object.defineProperty(globalThis, 'crypto', { value: cryptoMock });

// Extend existing globalThis with additional properties
Object.defineProperty(globalThis, 'isSecureContext', { value: true });
Object.defineProperty(globalThis, 'crossOriginIsolated', { value: false });

// Mock matchMedia
globalThis.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock Navigator
class NavigatorMock implements Navigator {
  // Required Navigator properties
  userAgent = 'node.js';
  language = 'en-US';
  languages = ['en-US', 'en'];
  onLine = true;
  cookieEnabled = true;
  platform = 'test';
  maxTouchPoints = 0;
  doNotTrack = null;
  geolocation = {
    getCurrentPosition: vi.fn(),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
  };
  credentials = {
    get: vi.fn(),
    store: vi.fn(),
    create: vi.fn(),
    preventSilentAccess: vi.fn(),
  } as CredentialsContainer;
  appCodeName = 'Mozilla';
  appName = 'Netscape';
  appVersion = '5.0';
  connection = null;
  hardwareConcurrency = 4;
  product = 'Gecko';
  productSub = '20030107';
  vendor = 'Google Inc.';
  vendorSub = '';
  deviceMemory = 8;

  // Mocked APIs
  clipboard = {
    writeText: vi.fn(),
    readText: vi.fn(),
    read: vi.fn(),
    write: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as Clipboard;

  mediaDevices = {
    getUserMedia: vi.fn(),
    enumerateDevices: vi.fn(),
    getDisplayMedia: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    ondevicechange: null,
  } as unknown as MediaDevices;

  permissions = {
    query: vi.fn(),
  } as unknown as Permissions;

  // Additional required properties
  serviceWorker = {
    ready: Promise.resolve({} as ServiceWorkerRegistration),
    controller: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    register: vi.fn(),
    getRegistration: vi.fn(),
    getRegistrations: vi.fn(),
    startMessages: vi.fn(),
  } as unknown as ServiceWorkerContainer;
  storage = {
    persist: vi.fn(),
    persisted: vi.fn(),
    estimate: vi.fn(),
  } as unknown as StorageManager;
  managed = null;
  mediaCapabilities = {
    decodingInfo: vi.fn(),
    encodingInfo: vi.fn(),
  } as unknown as MediaCapabilities;
  mediaSession = {
    metadata: null,
    playbackState: 'none',
    setActionHandler: vi.fn(),
    setPositionState: vi.fn(),
  } as MediaSession;
  presentation = null;
  scheduling = null;
  usb = null;
  wakeLock = {
    request: vi.fn(),
  } as unknown as WakeLock;
  xr = null;
  userActivation = {
    hasBeenActive: false,
    isActive: false,
  } as UserActivation;
  plugins = {
    length: 0,
    item: () => null,
    namedItem: () => null,
    refresh: () => {},
    [Symbol.iterator]: function* () {
      yield* [];
    },
  } as unknown as PluginArray;

  mimeTypes = [] as unknown as MimeTypeArray;
  pdfViewerEnabled = false;
  webdriver = false;
  locks = {
    request: vi.fn(),
    query: vi.fn(),
  } as unknown as LockManager;

  // Methods
  canShare = vi.fn();
  share = vi.fn();
  clearAppBadge = vi.fn();
  setAppBadge = vi.fn();
  registerProtocolHandler = vi.fn();
  unregisterProtocolHandler = vi.fn();
  getGamepads = vi.fn();
  javaEnabled = vi.fn();
  sendBeacon = vi.fn();
  vibrate = vi.fn();
  requestMIDIAccess = vi.fn();
  requestMediaKeySystemAccess = vi.fn();
}

globalThis.navigator = new NavigatorMock();

// Mock console methods
globalThis.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
};

interface StorageMock extends Storage {
  getItem: ReturnType<typeof vi.fn>;
  setItem: ReturnType<typeof vi.fn>;
  clear: ReturnType<typeof vi.fn>;
  removeItem: ReturnType<typeof vi.fn>;
  key: ReturnType<typeof vi.fn>;
}

const createStorageMock = (): StorageMock => ({
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  key: vi.fn(),
});

// Helper to add more mocks as needed
const extendNavigatorMock = (extensions: Partial<Navigator>): void => {
  Object.assign(globalThis.navigator, extensions);
};

// Export all mocks for individual test customization
export {
  createStorageMock,
  NavigatorMock,
  IntersectionObserverMock,
  ResizeObserverMock,
  AbortControllerMock,
  performanceMock,
  URLMock,
  BlobMock,
  FileMock,
  FormDataMock,
  WebSocketMock,
  historyMock,
  locationMock,
  MutationObserverMock,
  selectionMock,
  cryptoMock,
  extendNavigatorMock,
};
