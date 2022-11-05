import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../lib/store";
import { config } from '../constants/config'

export type NamespaceData = NamespaceElement[];


export interface NamespaceElement {
	name: string
}

export interface Search {
  type: 'cluster' | 'node',
	namespace: NamespaceData | undefined
}

const initialState:Search = {
	type: 'cluster',
	namespace: undefined
}

const searchReducer = createSlice({
	name: 'searchBar',
	initialState: initialState,
	reducers: {
		updateData:  (state, action: PayloadAction<NamespaceData>) => {
      state.namespace = action.payload;
  	}
  }
})





export default searchReducer.reducer;