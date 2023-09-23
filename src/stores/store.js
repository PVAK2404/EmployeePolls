import { init } from '@rematch/core';

import { models } from './models';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['authStore'],
// };

export const store = init({ models });
