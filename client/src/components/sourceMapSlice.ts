import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { Cluster } from './clusterView';

export enum ViewType {cluster = 0, trace = 1}

const initialState: View = {
  type: ViewType.cluster
}

export interface View {
  type: ViewType
}

export const sourceMapSlice = createSlice({
  name: 'sourceMap',
  initialState: initialState,
  reducers: {
    changeView: (state, action: PayloadAction<ViewType>) => {
      state.type = action.payload
    }
  }
})

export const { changeView } = sourceMapSlice.actions;
export const selectSourceMap = (state: RootState) => state.sourceMap.type
export default sourceMapSlice.reducer;