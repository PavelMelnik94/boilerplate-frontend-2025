import type { StorageConfig, StorageFactory } from './types'

import { logger } from '@/utils/logger'

import { EnhancedStorage } from './EnhancedStorage'

class StorageFactoryImpl implements StorageFactory {
  private stores = new Map<string, EnhancedStorage>()

  create(config: StorageConfig): EnhancedStorage {
    if (this.stores.has(config.name)) {
      logger.warn(`Storage with name "${config.name}" already exists. Returning existing instance.`)
      return this.stores.get(config.name)!
    }

    const storage = new EnhancedStorage(config)
    this.stores.set(config.name, storage)
    return storage
  }

  getStore(name: string): EnhancedStorage | undefined {
    return this.stores.get(name)
  }

  async removeStore(name: string): Promise<void> {
    const storage = this.stores.get(name)
    if (storage) {
      try {
        await storage.clear()
      }
      catch (error) {
        logger.error(`Failed to remove storage "${name}":`, error)
      }
      finally {
        this.stores.delete(name)
      }
    }
  }

  listStores(): string[] {
    return [...this.stores.keys()]
  }
}

export const storageFactory = new StorageFactoryImpl()
