import { createSlice } from '@reduxjs/toolkit';
import { ProfileParameters } from '../../../Utils/Types/profile.types';

const initialState: ProfileParameters = {
  id: '',
  firstName: '',
  UserAccount: { balance: '', updatedAt: '' },
  GroupsCreatedByUser: [
    {
      id: '',
      name: '',
    },
  ],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: initialState,
  },
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { getProfile } = profileSlice.actions;
