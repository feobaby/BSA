import { createSlice } from '@reduxjs/toolkit';
import { AuthParameters } from '../../../Utils/Types/auth.types';

const initialState: AuthParameters = {
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
    signOut: (state, action) => {
      state.user = action.payload;
    },
    signIn: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signUp, signOut } = authSlice.actions;
