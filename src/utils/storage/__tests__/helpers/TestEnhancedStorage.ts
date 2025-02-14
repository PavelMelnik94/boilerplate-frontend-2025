import { EnhancedStorage } from '../../EnhancedStorage';

import type { StorageConfig } from '../../types';

export class TestEnhancedStorage extends EnhancedStorage {
  constructor(config: StorageConfig) {
    super(config);
  }

  // Expose protected method for testing with proper async/await
  public async testInitialize(): Promise<void> {
    return await this.initialize();
  }
}
