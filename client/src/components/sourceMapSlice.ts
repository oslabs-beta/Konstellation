import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { Cluster } from './clusterView';

export enum ViewType {cluster = 0, trace = 1}

const initialState: View = {
  type: ViewType.cluster,
}

export interface View {
  type: ViewType
  data?: string | undefined
}

export const sourceMapSlice = createSlice({
  name: 'sourceMap',
  initialState: initialState,
  reducers: {
    changeView: (state, action: PayloadAction<View>) => {
      state.type = action.payload.type;
      state.data = action.payload.data
    }
  }
})

export const { changeView } = sourceMapSlice.actions;
export const selectSourceMap = (state: RootState) => state.sourceMap.type;
export const selectSourceMapData = (state: RootState) => state.sourceMap.data;
export default sourceMapSlice.reducer;