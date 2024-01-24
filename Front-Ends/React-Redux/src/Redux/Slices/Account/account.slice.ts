import { createSlice } from '@reduxjs/toolkit';
import { AccountParameters } from '../../../Utils/Types/account.types';

const initialState: AccountParameters = {
  amount: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    account: initialState,
  },
  reducers: {
    addMoney: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { addMoney } = accountSlice.actions;
