import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TransactionParameters } from '../../../Utils/Types/transaction.types';

interface TransactionItem {
  category: string;
  amount: string;
  createdAt: string;
}

interface TransactionState {
  rows: TransactionItem[];
}

const initialState: TransactionState = {
  rows: [
    {
      category: '',
      amount: '',
      createdAt: ''
    },
  ],
};

// const initialState: TransactionParameters = {
//   data: [
//     {
//       category: '',
//       amount: '',
//     },
//   ],
// };

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactions: (state, action: PayloadAction<{rows: TransactionItem[]}>) => {
      state.rows = action.payload.rows;
    },
  },
});

export const { getTransactions } = transactionSlice.actions;
