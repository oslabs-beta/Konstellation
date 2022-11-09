import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from '../../store';


export enum spanViewType {noRender, render}

const initialState: Render = {
  type: spanViewType.noRender,
  
}

export interface Render {
  type: spanViewType,
  
}

/**
   * Handles reducer logic related to Source Map View Type Updates
   */
export const spanResultsMapSlice = createSlice({
  name: 'spanResultsMap',
  initialState: initialState,
  reducers: {
    changeSpanDataView: (state, action: PayloadAction<Render>) => {
      state.type = action.payload.type
    }
  }
})

export const { changeSpanDataView } = spanResultsMapSlice.actions;
export const selectSpanResultsMap = (state: RootState) => state.spanResultsMap;
export default spanResultsMapSlice.reducer;
