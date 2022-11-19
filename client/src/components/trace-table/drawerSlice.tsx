import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import { config } from '../../constants/config';

/**
 * Handles redux store management related to the opening and closing of drawers.
 * @remarks If you intend to add additional Drawers, you will need to add additional 
 * selectors and reducers here and in the store.
 */
export enum DrawerType {
  traceView,
}

export type Drawer = {
  type: DrawerType;
};

interface DrawerData {
  id: string;
  label: string;
  type: string;
  duration: number;
  response: number;
  method: string;
}

export interface DrawerState {
  isOpen: boolean;
  data: DrawerData | undefined;
}

/**
 * Retrieves the Trace Data for the TraceTable Drawer
 * @remarks Asynchronously fetches data.
 * @returns A promise which yields a collection of Trace Data in the following format: {@link DrawerData}
 */
export const getTraceListAsync = createAsyncThunk(
  'traceTable/getTraceData',
  async () => {
    const response = await fetch(config.url + '/api/traces');
    const data = await response.json();
    return data.data;
  }
);

const initialState: DrawerState = {
  isOpen: false,
  data: undefined,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: initialState,
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const selectTraceTableDrawerIsOpen = (state: RootState) =>
  state.traceDrawer.isOpen;

export const { toggleIsOpen: toggleIsOpen } = drawerSlice.actions;

export default drawerSlice.reducer;
