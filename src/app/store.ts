import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'
import { api } from './api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
