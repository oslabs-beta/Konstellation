import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { config } from '../constants/config';
import { stat } from 'fs';

export type NamespaceData = NamespaceElement[];

export interface NamespaceElement {
  name: string;
}

export interface SearchData {
  id: string;
  type: string;
  traceID?: string;
  traceStart?: string;
  traceDuration?: string;
  serviceCount?: number;
  spanCount?: number;
  label: any;
}

export interface SearchResult {
  data?: SearchData;
  classes?: any;
}

export interface Search {
  type: 'cluster' | 'trace';
  status: 'idle' | 'loading' | 'failed';
  namespace: NamespaceData | undefined;
  data: SearchResult;
}

const initialState: Search = {
  type: 'cluster',
  status: 'idle',
  namespace: undefined,
  data: {},
};

//sends an async call to the backend to get the trace data that would show up on the search bar in the trace view screen
export const getTraceViewInfo = createAsyncThunk(
  'searchBar/traceInfo',
  async (traceId: string) => {
    //Endpoint is a work in progress
    const response = await fetch(
      config.url + `/api/traces/getSearchbarTraceView/${traceId}`
    );
    const data = await response.json();
    return data;
  }
);

const searchReducer = createSlice({
  name: 'searchBar',
  initialState: initialState,
  reducers: {
    updateData: (state, action: PayloadAction<NamespaceData>) => {
      state.namespace = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTraceViewInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getTraceViewInfo.fulfilled,
        (state, action: PayloadAction<SearchResult>) => {
          state.status = 'idle';
          state.data = action.payload;
        }
      )
      .addCase(getTraceViewInfo.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectNameSpace = (state: RootState) => state.search.namespace;
export const selectSearchTraceResult = (state: RootState) => state.search.data;

export default searchReducer.reducer;
