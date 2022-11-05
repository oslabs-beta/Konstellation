import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import clusterReducer from './components/clusterViewSlice'
import sourceMapReducer from './components/sourceMapSlice'
import footerButtonReducer from './components/footerButtonSlice'

export const store = configureStore({
  reducer: {
    sourceMap: sourceMapReducer,
    cluster: clusterReducer,
    footerButton: footerButtonReducer,
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