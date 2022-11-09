import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import { config } from '../../constants/config'
import { useSelector } from "react-redux";
import sourceMapSlice, { selectSourceMap } from "../sourceMapSlice";


const initialState: SingleSpanData = {
  status: 'idle',
  data: [],
}

export interface SingleSpanData {
  status: string
  data: OneSpanData
}

type SpanNames = String

//will probably need to change this from SpanNames depending on incoming data.
type OneSpanData = SpanNames[]


//need to update endpoint for getSpanDataAsync

export const getSpanDataAsync = createAsyncThunk(
  'spanData/getSpanData',
  async (traceId: String) => {
    const url = config.url + '/api/traces/' + traceId 

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
   * Handles reducer logic related to Span Data View Type Updates
   */
export const spanDataSlice = createSlice({
  name: 'spanData',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpanDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSpanDataAsync.fulfilled, (state, action: PayloadAction<OneSpanData>) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getSpanDataAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
})

export const selectSpanDataList = (state: RootState) => state.spanData;
export default spanDataSlice.reducer;
