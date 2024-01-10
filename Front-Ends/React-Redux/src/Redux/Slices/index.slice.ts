import { combineSlices } from '@reduxjs/toolkit';
import { authSlice } from './auth.slice';
import { loadSlice } from './load.slice';

export const rootReducer = combineSlices(authSlice, loadSlice);
