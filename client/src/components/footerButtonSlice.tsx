import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { config } from '../constants/config'

/**
   * Defines the types of permitted Footer Buttons
   *
   * @remarks
   * If you intend to add additional footers, you will need to include them here.
   *
   */
export enum FooterButtonType { traceView }

export type FooterButton = {
  type: FooterButtonType
}

interface FooterButtonData {
  id: string,
  label: string,
  type: string,
  duration: number,
  response: number,
  method: string,
}

interface FooterButtonState {
  fullscreen: boolean,
  data: FooterButtonData | undefined
}

/**
   * Retrieves the Trace Data for the traceView FooterButton
   *
   * @remarks
   * Asynchronously fetches data.
   *
   * @returns A promise which yields a collection of Trace Data in the following format: {@link FooterButtonData}
   *
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
  fullscreen: false,
  data: undefined,
}

export const footerButtonSlice = createSlice({
  name: 'clusterView',
  initialState: initialState,
  reducers: { 
    toggleFullscreen:  (state) => {
      state.fullscreen = !state.fullscreen;
    }
  },
})

export const selectFooterButtonFullscreen = (state: RootState) => state.footerButton.fullscreen;

export const { toggleFullscreen } = footerButtonSlice.actions;

export default footerButtonSlice.reducer;