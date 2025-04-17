import { configureStore } from '@reduxjs/toolkit'
import baseApi from './baseApi'
import tap from './slice/tap.slice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [tap.reducerPath]: tap.reducer
  },
  middleware: (getDeafultMiddlewars)=> getDeafultMiddlewars().concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch