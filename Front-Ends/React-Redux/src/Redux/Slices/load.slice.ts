import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const loadSlice = createSlice({
  name: 'load',
  initialState: {
    loading: initialState.loading,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = loadSlice.actions;
export default loadSlice.reducer;
