import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alert: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alert: initialState.alert,
  },
  reducers: {
    showAlert: (state) => {
      state.alert = true;
    },
    stopAlert: (state) => {
      state.alert = false;
    },
  },
});

export const { showAlert, stopAlert } = alertSlice.actions;
export default alertSlice.reducer;
