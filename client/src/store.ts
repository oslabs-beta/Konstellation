import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import clusterReducer from './components/clusterViewSlice'
import sourceMapReducer from './components/sourceMapSlice'
import drawerReducer from './components/trace-table/drawerSlice'
import traceViewReducer from './components/traceViewSlice'

export const store = configureStore({
  reducer: {
    sourceMap: sourceMapReducer,
    cluster: clusterReducer,
    traceDrawer: drawerReducer,
    traceView: traceViewReducer,
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