// import localforage from 'localforage';

// import { storageFactory } from './StorageFactory';

//  Create custom storage instance
// const customStorage = storageFactory.create({
//   name: 'custom-storage',
//   storeName: 'custom',
//   driver: [localforage.INDEXEDDB],
//   encrypted: true,
//   encryptionKey: 'custom-key',
//   saveOnChange: true,
//   initialState: {
//     customData: null,
//   },
//   version: 1,
//   description: 'Custom storage for specific needs',
// });

// Example of using multiple storage instances
// async function multiStorageExample() {
//   try {
//      Using pre-configured storage instances
//     const mainStorage = storageFactory.getStore('main-storage');
//     if (mainStorage) {
//       await mainStorage.set('user', {
//         name: 'UserTest',
//         id: 94,
//         lastLogin: '2025-02-12 08:08:18',
//       });
//     }

//      Using temporary storage instance
//     const tempStorage = storageFactory.getStore('temp-storage');
//     if (tempStorage) {
//       await tempStorage.set('sessionData', {
//         lastAccess: new Date().toISOString(),
//       });
//     }

//      Using custom storage instance
//     await customStorage.set('customData', {
//       someData: 'value',
//       additionalInfo: {
//         description: 'This is some additional data associated with customData',
//         createdAt: new Date().toISOString(),
//       },
//     });

//      Retrieve the list of all storage instances
//     const stores = storageFactory.listStores();
//     console.log('Available stores:', stores);

//     Retrieve data from different storage instances
//     const userData = await mainStorage?.get('user');
//     const sessionData = await tempStorage?.get('sessionData');
//     const customData = await customStorage.get('customData');

//     console.log({
//       userData,
//       sessionData,
//       customData,
//     });
//   } catch (error) {
//     console.error('Storage error:', error);
//   }
// }
