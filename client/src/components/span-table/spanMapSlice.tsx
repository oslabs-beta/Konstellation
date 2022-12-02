import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export enum RenderType {
  noRender,
  render,
}

const initialState: Render = {
  type: RenderType.noRender,
  data: 'placeholder',
  id: 'placeholder',
};

export interface Render {
  type: RenderType;
  data?: string;
  id?: string;
}

export const spanMapSlice = createSlice({
  name: 'spanMap',
  initialState: initialState,
  reducers: {
    changeRenderView: (state, action: PayloadAction<Render>) => {
      (state.type = action.payload.type),
      (state.data = action.payload.data),
      (state.id = action.payload.id);
    },
  },
});

export const { changeRenderView } = spanMapSlice.actions;
export const selectSpanMap = (state: RootState) => state.spanMap;
export default spanMapSlice.reducer;
