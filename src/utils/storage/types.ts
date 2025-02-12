import { INDEXEDDB, LOCALSTORAGE, WEBSQL } from 'localforage';

import type { THEME } from '@/types/common.enum';

import type { EnhancedStorage } from './EnhancedStorage';

export interface Settings {
  theme: THEME.DARK | THEME.LIGHT;
  language: string;
}

export interface StorageSchema {
  settings: Settings;
  [key: string]: any;
}

export interface StorageConfig {
  name: string;
  storeName: string;
  driver?: (typeof INDEXEDDB | typeof LOCALSTORAGE | typeof WEBSQL)[];
  encrypted: boolean;
  encryptionKey?: string;
  saveOnChange: boolean;
  initialState: Partial<StorageSchema>;
  version?: number;
  description?: string;
}

export interface StorageFactory {
  create: (config: StorageConfig) => EnhancedStorage;
  getStore: (name: string) => EnhancedStorage | undefined;
  removeStore: (name: string) => void;
  listStores: () => string[];
}
