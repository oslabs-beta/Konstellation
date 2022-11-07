import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { config } from '../constants/config'
import { Trace } from "./traceView";

const initialState: Trace = {
  data: [],
  status: 'idle'
}

export type TraceData = {
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
    const url = config.url + '/api/traces/getTraceView'

    //Use these logs as a first step towards troubleshooting trace fetch requests:
    console.log("Fetching Data From: ")
    console.log(url)

    const response = await fetch(url)
    const data = await response.json();
    return data;
  }
)

export const traceViewSlice = createSlice({
  name: 'traceView',
  initialState: initialState,
  reducers: { 
    updateData:  (state, action: PayloadAction<Trace>) => {
      state.data = action.payload.data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTraceDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTraceDataAsync.fulfilled, (state, action: PayloadAction<Trace>) => {
        state.status = 'idle';
        state.data = action.payload.data;
      })
      .addCase(getTraceDataAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
})

export const selectTraceView = (state: RootState) => state.traceView;

export default traceViewSlice.reducer;