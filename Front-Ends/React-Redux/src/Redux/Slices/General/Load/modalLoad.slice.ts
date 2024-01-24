import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalLoading: false,
};

export const modalLoadSlice = createSlice({
  name: 'modalLoader',
  initialState: {
    modalLoading: initialState.modalLoading,
  },
  reducers: {
    startModalLoading: (state) => {
      state.modalLoading = true;
    },
    stopModalLoading: (state) => {
      state.modalLoading = false;
    },
  },
});

export const { startModalLoading, stopModalLoading } = modalLoadSlice.actions;

export default modalLoadSlice.reducer;
