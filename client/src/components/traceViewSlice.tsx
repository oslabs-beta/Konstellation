import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { config } from '../constants/config'
import { Trace } from "./traceView";

const initialState: Trace = {
  data: [],
  status: 'idle'
}

export type TraceData = Data[]

export type Data = {
  data: {
    id: string,
    label: string,
    type: string,
  }
  classes: string,
}

export const getTraceDataAsync = createAsyncThunk(
  'traceView/getTraceData',
  async (traceId: string) => {
    const url = config.url + '/api/traces/getTraceView/' + traceId

    //Use these logs as a first step towards troubleshooting trace fetch requests:
    console.log("Fetching Data From: ")
    console.log(url)

    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
    return data;
  }
)

export const traceViewSlice = createSlice({
  name: 'traceView',
  initialState: initialState,
  reducers: { 
    updateData:  (state, action: PayloadAction<TraceData>) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTraceDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTraceDataAsync.fulfilled, (state, action: PayloadAction<TraceData>) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getTraceDataAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
})

export const selectTraceView = (state: RootState) => state.traceView;

export default traceViewSlice.reducer;