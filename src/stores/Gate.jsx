import { getPersistor } from '@rematch/persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store } from './store';

const persistor = getPersistor();

export default function Gate({ children }) {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>{children}</Provider>
    </PersistGate>
  );
}
