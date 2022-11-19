import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { Cluster } from './clusterView';

export enum ViewType {
  cluster,
  trace,
}

const initialState: View = {
  type: ViewType.cluster,
  data: undefined,
};

export interface View {
  type: ViewType;
  data?: string;
}

/**
 * Handles reducer logic related to Source Map View Type Updates
 */
export const sourceMapSlice = createSlice({
  name: 'sourceMap',
  initialState: initialState,
  reducers: {
    changeView: (state, action: PayloadAction<View>) => {
      (state.type = action.payload.type), (state.data = action.payload.data);
    },
  },
});

export const { changeView } = sourceMapSlice.actions;
export const selectSourceMap = (state: RootState) => state.sourceMap;
export default sourceMapSlice.reducer;
