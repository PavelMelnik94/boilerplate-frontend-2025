import type { StorageConfig, StorageSchema } from './types'
import { logger } from '@/utils/logger'

import CryptoJS from 'crypto-js'

import localforage from 'localforage'

export class EnhancedStorage {
  private storage: LocalForage
  private subscribers: Map<keyof StorageSchema, Set<(newValue: any, oldValue: any) => void>>
  private config: StorageConfig
  private cache: Partial<StorageSchema>

  constructor(config: StorageConfig) {
    this.storage = localforage.createInstance({
      name: config.name,
      storeName: `${config.name}_store`,
    })

    this.config = {
      ...config,
      encrypted: config.encrypted ?? false,
      saveOnChange: config.saveOnChange ?? true,
      initialState: config.initialState ?? {},
    }

    this.subscribers = new Map()
    this.cache = { ...this.config.initialState }

    // Initialize immediately but don't block constructor
    this.initialize().catch((error) => {
      logger.error('Storage initialization error:', error)
    })
  }

  protected async initialize(): Promise<void> {
    try {
      for (const key of Object.keys(this.config.initialState)) {
        const storageKey = key as keyof StorageSchema
        const value = await this.get(storageKey) as unknown
        if (value === null) {
          await this.set(storageKey, this.config.initialState[storageKey])
        }
      }
    }
    catch (error) {
      logger.error('Storage initialization error:', error)
      throw error // Re-throw to ensure error propagation
    }
  }

  private encrypt(data: any): string {
    if (!this.config.encrypted || (this.config.encryptionKey == null)) {
      return JSON.stringify(data)
    }
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.config.encryptionKey).toString()
  }

  private decrypt<T>(data: string): T {
    if (!this.config.encrypted || (this.config.encryptionKey == null)) {
      return JSON.parse(data) as T
    }
    const bytes = CryptoJS.AES.decrypt(data, this.config.encryptionKey)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T
  }

  async set<K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): Promise<StorageSchema[K]> {
    const oldValue = this.cache[key]
    this.cache[key] = value

    if (this.config.saveOnChange) {
      const encrypted = this.encrypt(value)
      await this.storage.setItem(key as string, encrypted)
    }

    this.notifySubscribers(key, value, oldValue)

    // eslint-disable-next-line ts/no-unsafe-return
    return value
  }

  async get<K extends keyof StorageSchema>(key: K): Promise<StorageSchema[K] | null> {
    if (this.cache[key] !== undefined) {
      return Promise.resolve(this.cache[key] as StorageSchema[K])
    }

    try {
      const encrypted = await this.storage.getItem(key as string)
      if (encrypted === null)
        return null

      const value = this.decrypt<StorageSchema[K]>(encrypted as string)
      this.cache[key] = value
      // eslint-disable-next-line ts/return-await
      return Promise.resolve(value)
    }
    catch (error) {
      logger.error(`Failed to get item "${key}":`, error)
      return null
    }
  }

  async merge<K extends keyof StorageSchema>(key: K, value: Partial<StorageSchema[K]>): Promise<StorageSchema[K]> {
    const currentValue = await this.get(key)
    const newValue = { ...currentValue, ...value }
    return this.set(key, newValue)
  }

  async remove<K extends keyof StorageSchema>(key: K): Promise<void> {
    delete this.cache[key]
    await this.storage.removeItem(key as string)
    this.notifySubscribers(key, undefined, this.cache[key])
  }

  async clear(): Promise<void> {
    this.cache = { ...this.config.initialState }
    await this.storage.clear()
  }

  onChange<K extends keyof StorageSchema>(
    key: K,
    callback: (newValue: StorageSchema[K], oldValue: StorageSchema[K]) => void,
  ): () => void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set())
    }

    this.subscribers.get(key)!.add(callback)
    return () => {
      this.subscribers.get(key)?.delete(callback)
    }
  }

  private notifySubscribers<K extends keyof StorageSchema>(
    key: K,
    newValue: StorageSchema[K],
    oldValue: StorageSchema[K],
  ): void {
    this.subscribers.get(key)?.forEach(callback => callback(newValue, oldValue))
  }
}
