import type { StorageConfig } from '../../types'

import { EnhancedStorage } from '../../EnhancedStorage'

export class TestEnhancedStorage extends EnhancedStorage {
  constructor(config: StorageConfig) {
    super(config)
  }

  // Expose protected method for testing with proper async/await
  public async testInitialize(): Promise<void> {
    return this.initialize()
  }
}
