import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { config } from '../constants/config'

export type NamespaceData = NamespaceElement[];

export interface NamespaceElement {
	name: string
}

export interface Search {
  type: 'cluster' | 'trace',
	namespace: NamespaceData | undefined
}

const initialState: Search = {
	type: 'cluster',
	namespace: undefined
}

//sends a fetch request to the backend to get the traces for 1 trace
export const getTraceAsync = (traceID:string | undefined) =>  createAsyncThunk(
  'searchBar/getTraces',
  async () => {
    const response = await fetch(config.url + `/api/traces${traceID}`)
    const data = await response.json();
    return data;
  }
)

export const getNamespaceAsync = createAsyncThunk(
  'searchBar/getNamespace',
  async () => {
    const response = await fetch(config.url + '/api/cluster')
    const data = await response.json();
    return data;
  }
)

const searchReducer = createSlice({
	name: 'searchBar',
	initialState: initialState,
	reducers: {
		updateData:  (state, action: PayloadAction<NamespaceData>) => {
      state.namespace = action.payload;
  	}
  }
})



export const selectNameSpace = (state: RootState) => state.search.namespace;


export default searchReducer.reducer;