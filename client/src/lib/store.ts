import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import clusterReducer from '../components/clusterViewSlice'
import searchReducer from '../components/searchBarSlice'

export const store = configureStore({
  reducer: {
    cluster: clusterReducer,
		search: searchReducer,
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