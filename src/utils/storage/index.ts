import { storageFactory } from './StorageFactory';
import { storageConfigs } from './config';
export type * from './types';

// Create main, temporary, secure and cache storage instances *ANCHOR
const mainStorage = storageFactory.create(storageConfigs.main);
const tempStorage = storageFactory.create(storageConfigs.temporary);
const secureStorage = storageFactory.create(storageConfigs.secure);
const cacheStorage = storageFactory.create(storageConfigs.cache);

// Export the factory and pre-built storage instances *ANCHOR
export { cacheStorage, mainStorage, secureStorage, storageFactory, tempStorage };

// Export configurations
export { storageConfigs };
