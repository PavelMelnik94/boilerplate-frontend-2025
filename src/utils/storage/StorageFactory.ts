import { logger } from '@/utils/logger';

import { EnhancedStorage } from './EnhancedStorage';

import type { StorageConfig, StorageFactory } from './types';

class StorageFactoryImpl implements StorageFactory {
  private stores = new Map<string, EnhancedStorage>();

  create(config: StorageConfig): EnhancedStorage {
    if (this.stores.has(config.name)) {
      console.warn(`Storage with name "${config.name}" already exists. Returning existing instance.`);
      return this.stores.get(config.name)!;
    }

    const storage = new EnhancedStorage(config);
    this.stores.set(config.name, storage);
    return storage;
  }

  getStore(name: string): EnhancedStorage | undefined {
    return this.stores.get(name);
  }

  removeStore(name: string): void {
    const storage = this.stores.get(name);
    if (storage) {
      storage
        .clear()
        .then(() => {
          this.stores.delete(name);
        })
        .catch((error) => {
          logger.error(`Failed to remove storage "${name}":`, error);
        });
    }
  }

  listStores(): string[] {
    return [...this.stores.keys()];
  }
}

export const storageFactory = new StorageFactoryImpl();
