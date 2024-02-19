import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['note']
}

const persistedReducers = persistReducer(persistConfig, rootReducer)

export function setupStore(preloadedState?: RootState) {
  if (typeof window === 'undefined') {
    //NextJs cannot use persistStore
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
      preloadedState
    });
  } else {
    return configureStore({
      reducer: persistedReducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
      preloadedState
    })
  }
}

export type RootState = ReturnType<typeof persistedReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']