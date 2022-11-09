import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from '../../store';


export enum RenderType {noRender, render}

const initialState: Render = {
  type: RenderType.noRender,
  data: 'placeholder'
}

export interface Render {
  type: RenderType,
  data: String
}

/**
   * Handles reducer logic related to Source Map View Type Updates
   */
export const spanMapSlice = createSlice({
  name: 'spanMap',
  initialState: initialState,
  reducers: {
    changeRenderView: (state, action: PayloadAction<Render>) => {
      state.type = action.payload.type,
      state.data = action.payload.data
    }
  }
})

export const { changeRenderView } = spanMapSlice.actions;
export const selectSpanMap = (state: RootState) => state.spanMap;
export default spanMapSlice.reducer;
