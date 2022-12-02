import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { config } from '../constants/config';
import { Cluster } from './clusterView';

export type ClusterData = ClusterElement[];

export interface ClusterElement {
  data: {
    id: string;
    label: string;
    type: string;
  };
}

const initialState: Cluster = {
  data: [],
  status: 'idle',
  namespace: 'all',
};

// Included as a critical first step for troubleshooting:
console.log('Fetching Data From: ');
console.log(config.url + '/api/cluster');

export const getClusterAsync = createAsyncThunk(
  'clusterView/getCluster',
  async () => {
    const response = await fetch(config.url + '/api/cluster');
    const data = await response.json();
    return data;
  }
);

/**
 * Handles reducer logic related to the Cluster View
 */
export const clusterViewSlice = createSlice({
  name: 'clusterView',
  initialState: initialState,
  reducers: {
    updateData: (state, action: PayloadAction<ClusterData>) => {
      state.data = action.payload;
    },
    updateNameSpace: (state, action: PayloadAction<string>) => {
      state.namespace = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getClusterAsync.pending, (state) => {
        state.status = 'loading';
        state.data = [];
      })
      .addCase(
        getClusterAsync.fulfilled,
        (state, action: PayloadAction<ClusterData>) => {
          state.status = 'idle';
          state.data = action.payload;
        }
      )
      .addCase(getClusterAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectCluster = (state: RootState) => state.cluster;
export const { updateNameSpace } = clusterViewSlice.actions;
export default clusterViewSlice.reducer;
