import { combineSlices } from '@reduxjs/toolkit';
import { authSlice } from './Auth/auth.slice';
import { loadSlice } from './General/Load/load.slice';
import { profileSlice } from './Profile/profile.slice';
import { alertSlice } from './General/Alert/alert.slice';
import { accountSlice } from './Account/account.slice';
import { modalLoadSlice } from './General/Load/modalLoad.slice';
import { transactionSlice } from './Transactions/transaction.slice';

export const rootReducer = combineSlices(
  authSlice,
  loadSlice,
  profileSlice,
  alertSlice,
  accountSlice,
  transactionSlice,
  modalLoadSlice,
);
