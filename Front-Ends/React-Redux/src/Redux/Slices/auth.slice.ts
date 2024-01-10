import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialState,
  },
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signUp } = authSlice.actions;
