import { beforeEach, describe, expect, it } from 'vitest';

import { storageFactory } from '../StorageFactory';

import type { StorageConfig } from '../types';

describe('StorageFactory', () => {
  let testConfig: StorageConfig;

  beforeEach(async () => {
    testConfig = {
      name: 'test-storage',
      storeName: 'test',
      encrypted: false,
      saveOnChange: true,
      initialState: {},
    };

    // Reset the factory's state
    const stores = storageFactory.listStores();
    await Promise.all(stores.map(async (name) => await storageFactory.removeStore(name)));

    // Wait for any pending async operations
    return await new Promise((resolve) => setTimeout(resolve, 0));
  });

  describe('create', () => {
    it('should create a new storage instance', () => {
      const storage = storageFactory.create(testConfig);
      expect(storage).toBeDefined();
      expect(storageFactory.getStore(testConfig.name)).toBe(storage);
    });

    it('should return existing instance if name already exists', () => {
      const storage1 = storageFactory.create(testConfig);
      const storage2 = storageFactory.create(testConfig);
      expect(storage1).toBe(storage2);
    });
  });

  describe('getStore', () => {
    it('should return undefined for non-existent store', () => {
      const storage = storageFactory.getStore('non-existent');
      expect(storage).toBeUndefined();
    });

    it('should return correct store', () => {
      const storage = storageFactory.create(testConfig);
      const retrieved = storageFactory.getStore(testConfig.name);
      expect(retrieved).toBe(storage);
    });
  });

  describe('removeStore', () => {
    it('should remove existing store', async () => {
      // @ts-expect-error - Ensure the default configuration is compatible with the custom configuration
      const storage = storageFactory.create(testConfig);
      expect(storageFactory.getStore(testConfig.name)).toBeDefined();

      await storageFactory.removeStore(testConfig.name);
      // Wait for async clear operation to complete
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(storageFactory.getStore(testConfig.name)).toBeUndefined();
    });

    it('should handle removing non-existent store', () => {
      expect(async () => await storageFactory.removeStore('non-existent')).not.toThrow();
    });
  });

  describe('listStores', () => {
    it('should list all created stores', async () => {
      const config1 = { ...testConfig, name: 'store1' };
      const config2 = { ...testConfig, name: 'store2' };

      storageFactory.create(config1);
      storageFactory.create(config2);

      const stores = storageFactory.listStores();
      expect(stores).toContain('store1');
      expect(stores).toContain('store2');
      expect(stores.length).toBe(2);
    });

    it('should return empty array when no stores exist', async () => {
      // Wait for any pending clear operations
      await new Promise((resolve) => setTimeout(resolve, 0));
      const stores = storageFactory.listStores();
      expect(stores).toEqual([]);
    });
  });
});
