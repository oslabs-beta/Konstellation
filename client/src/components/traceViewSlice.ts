import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import coseBilkent from 'cytoscape-cose-bilkent';
import cytoscape from 'cytoscape';
import { config } from '../constants/config'
import { Trace } from './traceView'

export type TraceData = TraceElement[];

export interface TraceElement {
  id: string,
  label: string,
  type: string,
}

const initialState: Trace = {
  data: undefined,
  status: 'idle'
}

cytoscape.use(coseBilkent);

console.log("Fetching Data From: ")
console.log(config.url + '/api/trace')

export const getTraceAsync = createAsyncThunk(
  'traceVisualizer/getData',
  async () => {
    const response = await fetch(config.url + '/api/trace')
    const data = await response.json();
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
      .addCase(getTraceAsync.pending, (state) => {
      state.status = 'loading';
      })
      .addCase(getTraceAsync.fulfilled, (state, action: PayloadAction<TraceData>) => {
      state.status = 'idle';
      state.data = action.payload;
      })
      .addCase(getTraceAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
})

export const selectData = (state: RootState) => 
{
  return state.trace.data;
}

export default traceViewSlice.reducer;