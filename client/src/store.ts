import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import clusterReducer from './components/clusterViewSlice'
import sourceMapReducer from './components/sourceMapSlice'
import searchReducer from './components/searchBarSlice'
import drawerReducer from './components/trace-table/drawerSlice'
import traceViewReducer from './components/traceViewSlice'
import traceTableReducer from './components/trace-table/tableListSlice'

export const store = configureStore({
  reducer: {
    sourceMap: sourceMapReducer,
    cluster: clusterReducer,
		search: searchReducer,
    traceDrawer: drawerReducer,
    traceView: traceViewReducer,
    traceTable: traceTableReducer,
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