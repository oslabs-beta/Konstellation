import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { Cluster } from './clusterView';

export enum ViewType {cluster, trace}

const initialState: View = {
  type: ViewType.cluster
}

export interface View {
  type: ViewType
}

/**
   * Handles reducer logic related to Source Map View Type Updates
   */
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
export const selectSourceMapType = (state: RootState) => state.sourceMap.type
export default sourceMapSlice.reducer;
