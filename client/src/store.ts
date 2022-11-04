import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import clusterReducer from './components/clusterViewSlice'

export const store = configureStore({
  reducer: {
    cluster: clusterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;