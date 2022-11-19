import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;

// Allows you to extract data from the Redux store state, using a selector function.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
