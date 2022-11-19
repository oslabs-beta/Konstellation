import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import { config } from '../../constants/config';
import { useSelector } from 'react-redux';
import sourceMapSlice, { selectSourceMap } from '../sourceMapSlice';

const initialState: SingleSpanData = {
  status: 'idle',
  data: [],
};

export interface SingleSpanData {
  status: string;
  data: OneSpanData;
}

type SpanNames = string;

type OneSpanData = SpanNames[];

export const getSpanDataAsync = createAsyncThunk(
  'spanData/getSpanData',
  async (spanId: string) => {
    const url = config.url + '/api/traces/getIndivSpanDetails/' + spanId;

    const response = await fetch(url);
    const data = await response.json();

    return data;
  }
);
/**
 * Handles reducer logic related to Span Data View Type Updates
 */
export const spanDataSlice = createSlice({
  name: 'spanData',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpanDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getSpanDataAsync.fulfilled,
        (state, action: PayloadAction<OneSpanData>) => {
          state.status = 'idle';
          state.data = action.payload;
        }
      )
      .addCase(getSpanDataAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectSpanDataList = (state: RootState) => state.spanData;
export default spanDataSlice.reducer;
