import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import { config } from '../../constants/config'

/**
   * Defines the types of permitted Footer Drawers
   * @remarks
   * If you intend to add additional Drawers, you will need to include them here.
   */
export enum FooterDrawerType { traceView }

export type FooterDrawer = {
  type: FooterDrawerType
}

interface FooterDrawerData {
  id: string,
  label: string,
  type: string,
  duration: number,
  response: number,
  method: string,
}

interface FooterButtonState {
  isOpen: boolean,
  data: FooterDrawerData | undefined
}

/**
   * Retrieves the Trace Data for the FooterDrawer
   * @remarks
   * Asynchronously fetches data.
   * @returns A promise which yields a collection of Trace Data in the following format: {@link FooterDrawerData}
   */
export const getTraceDataAsync = createAsyncThunk(
  'traceTable/getTraceData',
  async () => {
    const response = await fetch(config.url + '/api/trace')
    const data = await response.json();
    return data.data;
  }
)

const initialState: FooterButtonState = {
  isOpen: false,
  data: undefined,
}

export const footerDrawerSlice = createSlice({
  name: 'clusterView',
  initialState: initialState,
  reducers: { 
    toggleIsOpen:  (state) => {
      state.isOpen = !state.isOpen;
    }
  },
})

export const selectFooterDrawerIsOpen = (state: RootState) => state.footerDrawer.isOpen;

export const { toggleIsOpen: toggleIsOpen } = footerDrawerSlice.actions;

export default footerDrawerSlice.reducer;