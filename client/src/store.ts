import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import clusterReducer from './components/clusterViewSlice'
import sourceMapReducer from './components/sourceMapSlice'
import drawerReducer from './components/trace-table/drawerSlice'
import traceViewReducer from './components/traceViewSlice'
import traceTableReducer from './components/trace-table/tableListSlice'
import spanTableReducer from './components/span-table/spanListSlice'
import spanMapReducer from './components/span-table/spanMapSlice'
import spanResultsMapReducer from './components/span-table/spanResultsMapSlice'
import spanDataReducer from './components/span-table/spanDataSlice'

export const store = configureStore({
  reducer: {
    sourceMap: sourceMapReducer,
    cluster: clusterReducer,
    traceDrawer: drawerReducer,
    traceView: traceViewReducer,
    traceTable: traceTableReducer,
    spanTable: spanTableReducer,
    spanMap: spanMapReducer,
    spanResultsMap: spanResultsMapReducer,
    spanData: spanDataReducer
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