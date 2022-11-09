import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import { config } from '../../constants/config'


const initialState: SpanTable = {
  status: 'idle',
  data: [],
}

export interface SpanTable {
  status: string
  data: SpanTableData
}

type SpanNames = String

type SpanTableData = SpanNames[]


export const getSpanTableAsync = createAsyncThunk(
  'spanTable/getSpanTableData',
  async () => {
    const url = config.url + '/api/traces/getIndividualPodData'

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
export const spanListSlice = createSlice({
  name: 'spanDataTable',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpanTableAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSpanTableAsync.fulfilled, (state, action: PayloadAction<SpanTableData>) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getSpanTableAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
})

export const selectSpanTableList = (state: RootState) => state.spanTable;
export default spanListSlice.reducer;
