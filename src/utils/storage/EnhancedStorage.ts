/* eslint-disable security/detect-object-injection */
import CryptoJS from 'crypto-js';
import localforage from 'localforage';

import { logger } from '@/utils/logger';

import type { StorageConfig, StorageSchema } from './types';

export class EnhancedStorage {
  private storage: LocalForage;
  private subscribers: Map<keyof StorageSchema, Set<(newValue: any, oldValue: any) => void>>;
  private config: StorageConfig;
  private cache: Partial<StorageSchema>;

  constructor(config: StorageConfig) {
    this.storage = localforage.createInstance({
      name: config.name,
      storeName: `${config.name}_store`,
    });

    this.config = {
      // @ts-expect-error - Ensure the default configuration is compatible with the custom configuration
      encrypted: false,
      // @ts-expect-error - Ensure the default configuration is compatible with the custom configuration
      saveOnChange: true,
      // @ts-expect-error - Ensure the default configuration is compatible with the custom configuration
      initialState: {},
      ...config,
    };

    this.subscribers = new Map();
    this.cache = { ...this.config.initialState };

    // Initialize immediately but don't block constructor
    this.initialize().catch((error) => {
      logger.error('Storage initialization error:', error);
    });
  }

  // Change from private to protected for testing
  protected async initialize(): Promise<void> {
    try {
      for (const key of Object.keys(this.config.initialState)) {
        const value = await this.get(key as keyof StorageSchema);
        if (value === null) {
          await this.set(key as keyof StorageSchema, this.config.initialState[key]);
        }
      }
    } catch (error) {
      logger.error('Storage initialization error:', error);
      throw error; // Re-throw to ensure error propagation
    }
  }

  private encrypt(data: any): string {
    if (!this.config.encrypted || !this.config.encryptionKey) {
      return JSON.stringify(data);
    }
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.config.encryptionKey).toString();
  }

  private decrypt(data: string): any {
    if (!this.config.encrypted || !this.config.encryptionKey) {
      return JSON.parse(data);
    }
    const bytes = CryptoJS.AES.decrypt(data, this.config.encryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  async set<K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): Promise<StorageSchema[K]> {
    const oldValue = this.cache[key];
    this.cache[key] = value;

    if (this.config.saveOnChange) {
      const encrypted = this.encrypt(value);
      await this.storage.setItem(key as string, encrypted);
    }

    this.notifySubscribers(key, value, oldValue);
    return value;
  }

  async get<K extends keyof StorageSchema>(key: K): Promise<StorageSchema[K] | null> {
    if (this.cache[key] !== undefined) {
      return this.cache[key] as StorageSchema[K];
    }

    try {
      const encrypted = await this.storage.getItem(key as string);
      if (encrypted === null) return null;

      const value = this.decrypt(encrypted as string);
      this.cache[key] = value;
      return value;
    } catch (error) {
      logger.error(`Failed to get item "${key}":`, error);
      return null;
    }
  }

  async merge<K extends keyof StorageSchema>(key: K, value: Partial<StorageSchema[K]>): Promise<StorageSchema[K]> {
    const currentValue = await this.get(key);
    const newValue = { ...currentValue, ...value };
    return await this.set(key, newValue);
  }

  async remove<K extends keyof StorageSchema>(key: K): Promise<void> {
    delete this.cache[key];
    await this.storage.removeItem(key as string);
    this.notifySubscribers(key, undefined, this.cache[key]);
  }

  async clear(): Promise<void> {
    this.cache = { ...this.config.initialState };
    await this.storage.clear();
  }

  onChange<K extends keyof StorageSchema>(
    key: K,
    callback: (newValue: StorageSchema[K], oldValue: StorageSchema[K]) => void,
  ): () => void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }

    this.subscribers.get(key)!.add(callback);
    return () => {
      this.subscribers.get(key)?.delete(callback);
    };
  }

  private notifySubscribers<K extends keyof StorageSchema>(
    key: K,
    newValue: StorageSchema[K],
    oldValue: StorageSchema[K],
  ): void {
    this.subscribers.get(key)?.forEach((callback) => callback(newValue, oldValue));
  }
}
