import localforage from 'localforage';

import { THEME } from '@/types/common.enum';

import type { StorageConfig } from './types';

// Prepare storage configurations *ANCHOR
export const storageConfigs = {
  //  Main storage with IndexedDB, WebSQL and localStorage
  main: {
    name: 'main-storage',
    storeName: 'main',
    driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
    encrypted: true,
    encryptionKey: process.env.NEXT_PUBLIC_STORAGE_ENCRYPTION_KEY,
    saveOnChange: true,
    initialState: {
      user: null,
      todos: [],
      settings: {
        theme: THEME.LIGHT,
        language: 'en',
      },
    },
    version: 1,
    description: 'Main application storage',
  } satisfies StorageConfig,

  // Temporary storage for session data
  temporary: {
    name: 'temp-storage',
    storeName: 'temporary',
    driver: [localforage.LOCALSTORAGE],
    encrypted: false,
    saveOnChange: true,
    initialState: {},
    version: 1,
    description: 'Temporary storage for session data',
  } satisfies StorageConfig,

  // Secure storage for sensitive data
  secure: {
    name: 'secure-storage',
    storeName: 'secure',
    driver: [localforage.INDEXEDDB],
    encrypted: true,
    encryptionKey: process.env.NEXT_PUBLIC_STORAGE_ENCRYPTION_KEY,
    saveOnChange: true,
    initialState: {},
    version: 1,
    description: 'Secure storage for sensitive data',
  } satisfies StorageConfig,

  // Cache storage for temporary data
  cache: {
    name: 'cache-storage',
    storeName: 'cache',
    driver: [localforage.LOCALSTORAGE],
    encrypted: false,
    saveOnChange: false, // Do not save changes automatically
    initialState: {},
    version: 1,
    description: 'Cache storage for temporary data',
  } satisfies StorageConfig,
};
