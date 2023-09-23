import { Provider } from 'react-redux';

import { store } from './store';

// const persistor = getPersistor();

export default function Gate({ children }) {
  return (
    // <PersistGate persistor={persistor}>
    <Provider store={store}>{children}</Provider>
    // </PersistGate>
  );
}
