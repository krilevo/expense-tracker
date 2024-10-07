import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import transactionsReducer from './transactionsSlice';
import categoriesReducer from './categoriesSlice';
import budgetsReducer from './budgetsSlice';

// Importing functions and constants from redux-persist for state persistence
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Importing storage engine from redux-persist (defaults to localStorage for web)
import storage from 'redux-persist/lib/storage';

// Combine all slice reducers into a single root reducer
const rootReducer = combineReducers({
  transactions: transactionsReducer,
  categories: categoriesReducer,
  budgets: budgetsReducer,
});

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',      // The key for the persisted state in storage
  storage          // The storage engine to use (localStorage in this case)
};

// Wrap your root reducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer and customized middleware
export const store = configureStore({
  reducer: persistedReducer,

  // Customize the default middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configure serializable checks
      serializableCheck: {
        // Ignore specific redux-persist actions that may contain non-serializable data
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor linked to the store for persisting the Redux state
export const persistor = persistStore(store);

// Define TypeScript types for the Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>; // Infers the state structure
export type AppDispatch = typeof store.dispatch;             // Infers the dispatch type
