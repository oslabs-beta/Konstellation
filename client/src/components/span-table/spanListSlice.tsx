import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { config } from '../../constants/config';

const initialState: SpanTable = {
  status: 'idle',
  data: [],
};

export interface SpanTable {
  status: string;
  data: SpanTableData;
}

//changed to any for passing props
type SpanNames = any;

type SpanTableData = SpanNames[];

export const getSpanTableAsync = createAsyncThunk(
  'spanList/getSpanNames',
  async (traceData: any) => {
    const { processTarget, traceId } = traceData;
    const url =
      config.url +
      '/api/traces/getSpansInProcess/' +
      traceId +
      '/' +
      processTarget;

    //Use these logs as a first step towards troubleshooting trace fetch requests:
    console.log('Fetching Data From: ');
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const spanListSlice = createSlice({
  name: 'spanDataTable',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpanTableAsync.pending, (state) => {
        state.status = 'loading';
        state.data = [];
      })
      .addCase(
        getSpanTableAsync.fulfilled,
        (state, action: PayloadAction<SpanTableData>) => {
          state.status = 'idle';
          state.data = action.payload;
        }
      )
      .addCase(getSpanTableAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectSpanTableList = (state: RootState) => state.spanTable;
export default spanListSlice.reducer;
