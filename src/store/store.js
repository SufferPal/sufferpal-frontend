import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

let user = {
  firstName: 'Daniel',
  lastName: 'Pencak',
  email: 'test@test.com',
  id: '8b3a0896-493e-4dc2-b4f8-806985b24fd4',
};

export const initialState = {
  user,
};

const persistConfig = { key: 'root', storage, stateReconciler: autoMergeLevel2, whitelist: ['user'] };
console.log(initialState);
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, initialState, composeWithDevTools());
export const persistor = persistStore(store);
console.log(store.getState());
