import type { Settings, StorageConfig } from '../types'
import { THEME } from '@/types/common.enum'

import { logger } from '@/utils/logger'
import CryptoJS from 'crypto-js'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { EnhancedStorage } from '../EnhancedStorage'

import { TestEnhancedStorage } from './helpers/TestEnhancedStorage'

// Mock localforage
const mockSetItem = vi.fn<(...args: [string, string]) => Promise<void>>()
const mockGetItem = vi.fn()
const mockRemoveItem = vi.fn()
const mockClear = vi.fn()

vi.mock('localforage', () => ({
  default: {
    createInstance: () => ({
      setItem: mockSetItem,
      getItem: mockGetItem,
      removeItem: mockRemoveItem,
      clear: mockClear,
    }),
  },
}))

vi.mock('@/utils/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
  },
}))

describe('enhancedStorage', () => {
  let storage: TestEnhancedStorage
  const testConfig: StorageConfig = {
    name: 'test-storage',
    storeName: 'test',
    encrypted: true,
    encryptionKey: 'test-key',
    saveOnChange: true,
    initialState: {
      settings: {
        theme: THEME.LIGHT,
        language: 'en',
      },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    storage = new TestEnhancedStorage(testConfig)
  })

  describe('initialization', () => {
    it('should handle initialization errors', async () => {
      const error = new Error('Storage error')
      vi.clearAllMocks()
      mockGetItem.mockRejectedValueOnce(error)

      try {
        await storage.testInitialize()
        throw error
      }
      catch (error_) {
        expect(error_).toBe(error)
      }
    })

    it('should initialize with default config values', () => {
      const minimalConfig: StorageConfig = {
        name: 'minimal',
        storeName: 'test',
        encrypted: false,
        saveOnChange: true,
        initialState: {},
      }

      const storage = new EnhancedStorage(minimalConfig)
      expect(storage).toBeDefined()
    })
  })

  describe('set', () => {
    it('should encrypt and store data when encryption is enabled', async () => {
      const data: Settings = {
        theme: THEME.DARK,
        language: 'en',
      }
      await storage.set('settings', data)

      expect(mockSetItem).toHaveBeenCalled()
      const [key, value] = mockSetItem.mock.calls[0]
      expect(key).toBe('settings')
      expect(typeof value).toBe('string')

      // Verify it's encrypted
      expect(value).not.toBe(JSON.stringify(data))
    })

    it('should notify subscribers when data changes', async () => {
      const mockCallback = vi.fn()
      storage.onChange('settings', mockCallback)

      const newData = { theme: THEME.DARK, language: 'fr' }
      await storage.set('settings', newData)

      expect(mockCallback).toHaveBeenCalledWith(newData, expect.any(Object))
    })
  })

  describe('encryption', () => {
    it('should not encrypt data when encryption is disabled', async () => {
      const unencryptedConfig: StorageConfig = {
        ...testConfig,
        encrypted: false,
      }
      const storage = new EnhancedStorage(unencryptedConfig)
      const data: Settings = {
        theme: THEME.DARK,
        language: 'en',
      }

      await storage.set('settings', data)
      const [, value] = mockSetItem.mock.calls[0]
      expect(value).toBe(JSON.stringify(data))
    })

    it('should handle missing encryption key', async () => {
      const noKeyConfig: StorageConfig = {
        ...testConfig,
        encrypted: true,
        encryptionKey: undefined,
      }
      const storage = new EnhancedStorage(noKeyConfig)
      const data: Settings = {
        theme: THEME.DARK,
        language: 'en',
      }

      await storage.set('settings', data)
      const [, value] = mockSetItem.mock.calls[0]
      expect(value).toBe(JSON.stringify(data))
    })
  })

  describe('get', () => {
    it('should decrypt and return stored data', async () => {
      const data: Settings = {
        theme: THEME.LIGHT,
        language: 'en',
      }
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), testConfig.encryptionKey!).toString()
      mockGetItem.mockResolvedValue(encrypted)

      const result = await storage.get('settings')
      expect(result).toEqual(data)
    })

    it('should return null for non-existent keys', async () => {
      mockGetItem.mockResolvedValue(null)

      const result = await storage.get('nonexistent') as Settings
      expect(result).toBeNull()
    })
  })

  describe('merge', () => {
    it('should merge new data with existing data', async () => {
      const initial = { theme: THEME.LIGHT, language: 'en' }
      const update = { theme: THEME.DARK }
      mockGetItem.mockResolvedValue(
        CryptoJS.AES.encrypt(JSON.stringify(initial), testConfig.encryptionKey!).toString(),
      )

      await storage.merge('settings', update)

      expect(mockSetItem).toHaveBeenCalled()
      const [, encryptedValue] = mockSetItem.mock.calls[0]
      const decrypted = JSON.parse(
        CryptoJS.AES.decrypt(encryptedValue, testConfig.encryptionKey!).toString(CryptoJS.enc.Utf8),
      ) as Settings

      expect(decrypted).toEqual({ ...initial, ...update })
    })
  })

  describe('remove', () => {
    it('should remove data and notify subscribers', async () => {
      const mockCallback = vi.fn()
      storage.onChange('settings', mockCallback)

      await storage.remove('settings')

      expect(mockRemoveItem).toHaveBeenCalledWith('settings')
      expect(mockCallback).toHaveBeenCalled()
    })
  })

  describe('clear', () => {
    it('should clear all data and reset to initial state', async () => {
      await storage.clear()

      expect(mockClear).toHaveBeenCalled()
      // Verify cache is reset to initial state
      const result = await storage.get('settings')
      expect(result).toEqual(testConfig.initialState.settings)
    })
  })

  describe('subscribers', () => {
    it('should allow multiple subscribers for the same key', async () => {
      const callback1 = vi.fn()
      const callback2 = vi.fn()

      storage.onChange('settings', callback1)
      storage.onChange('settings', callback2)

      const newData = { theme: THEME.DARK, language: 'fr' }
      await storage.set('settings', newData)

      expect(callback1).toHaveBeenCalledWith(newData, expect.any(Object))
      expect(callback2).toHaveBeenCalledWith(newData, expect.any(Object))
    })

    it('should properly unsubscribe listeners', async () => {
      const callback = vi.fn()
      const unsubscribe = storage.onChange('settings', callback)

      unsubscribe()

      await storage.set('settings', { theme: THEME.DARK, language: 'fr' })
      expect(callback).not.toHaveBeenCalled()
    })
  })

  describe('cache management', () => {
    it('should handle cache miss and storage error', async () => {
      const errorSpy = vi.spyOn(logger, 'error')
      mockGetItem.mockRejectedValueOnce(new Error('Storage error'))

      const data = await storage.get('nonexistent') as Settings

      expect(data).toBeNull()
      expect(errorSpy).toHaveBeenCalledWith('Failed to get item "nonexistent":', expect.any(Error))
    })

    it('should use cached value when available', async () => {
      const data: Settings = {
        theme: THEME.DARK,
        language: 'en',
      }
      await storage.set('settings', data)
      mockGetItem.mockClear()

      const cachedData = await storage.get('settings')
      expect(cachedData).toEqual(data)
      expect(mockGetItem).not.toHaveBeenCalled()
    })
  })
})
