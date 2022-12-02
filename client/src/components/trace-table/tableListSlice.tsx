import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { config } from '../../constants/config';

const initialState: TraceTable = {
  status: 'idle',
  data: [],
  service: [],
  activeService: undefined,
  lookback: '1m',
};

export type TraceTableEntry = {
  data: {
    timestamp: string;
    id: string;
    duration: string;
    response: string;
    method: string;
    url: string;
    namespaces: string;
  };
};

export type TraceDataTableParameters = {
  activeService: string | undefined;
  lookback: string;
};

type TraceTableData = TraceTableEntry[];

type AllServices = Services[];

export type Services = string;

export type Lookback = '2d' | '15m' | '5m' | '2m' | '1m';

export interface TraceTable {
  status: string;
  data: TraceTableData;
  service: AllServices;
  activeService: Services | undefined;
  lookback: Lookback;
}

export const getServicesAsync = createAsyncThunk(
  'traceTable/getServices',
  async () => {
    const url = config.url + '/api/traces/getTraceViewServices';
    //Use these logs as a first step towards troubleshooting trace fetch requests:
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    const sortedData = data.sort();
    return data;
  }
);

export const getTraceTableDataAsync = createAsyncThunk(
  'traceTable/getTraceTableData',
  async (parameters: TraceDataTableParameters) => {
    //enters the if statement if an async call is made to retrieve 
    // data from the backend before an active service is received
    if (parameters.activeService === undefined) {
      console.log('no active service available');
      return [];
    }

    const url =
      config.url +
      `/api/traces/getAll/${parameters.activeService}/${parameters.lookback}`;

    //Use these logs as a first step towards troubleshooting trace fetch requests:
    console.log('Fetching Data From: ');
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }
);
/**
 * Handles reducer logic related to Source Map View Type Updates
 */
export const tableListSlice = createSlice({
  name: 'traceTable',
  initialState: initialState,
  reducers: {
    updateService: (state, action: PayloadAction<string>) => {
      state.activeService = action.payload;
    },
    updateLookback: (state, action: PayloadAction<Lookback>) => {
      state.lookback = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTraceTableDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getTraceTableDataAsync.fulfilled,
        (state, action: PayloadAction<TraceTableData>) => {
          state.status = 'idle';
          state.data = action.payload;
        }
      )
      .addCase(getTraceTableDataAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getServicesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getServicesAsync.fulfilled,
        (state, action: PayloadAction<AllServices>) => {
          state.status = 'idle';
          state.service = action.payload;
        }
      )
      .addCase(getServicesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectTableList = (state: RootState) => state.traceTable;
export const getAllServices = (state: RootState) => state.traceTable.service;
export const selectService = (state: RootState) =>
  state.traceTable.activeService;
export const selectLookback = (state: RootState) => state.traceTable.lookback;
export const { updateLookback } = tableListSlice.actions;
export const { updateService } = tableListSlice.actions;
export default tableListSlice.reducer;
