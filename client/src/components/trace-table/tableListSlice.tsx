import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import { config } from '../../constants/config'


const initialState: TraceTable = {
  status: 'idle',
  data: [],
}

export type TraceTableEntry = {
  data: {
    timestamp: string,
    id: string,
    duration: string,
    response: string,
    method: string,
    url: string,
    namespaces: string
   }
}

type TraceTableData = TraceTableEntry[]

export interface TraceTable {
  status: string
  data: TraceTableData
}

export const getTraceTableDataAsync = createAsyncThunk(
  'traceTable/getTraceTableData',
  async ( lookback: string) => {
    const url = config.url + `/api/traces/getAll/${lookback}`

    //Use these logs as a first step towards troubleshooting trace fetch requests:
    console.log("Fetching Data From: ")
    console.log(url)

    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
    return data;
  }
)
/**
   * Handles reducer logic related to Source Map View Type Updates
   */
export const tableListSlice = createSlice({
  name: 'traceTable',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTraceTableDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTraceTableDataAsync.fulfilled, (state, action: PayloadAction<TraceTableData>) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getTraceTableDataAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
})

export const selectTableList = (state: RootState) => state.traceTable;
export default tableListSlice.reducer;
