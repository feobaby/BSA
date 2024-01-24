import { getRequest } from '../../../Utils/Axios-Verbs/axios-verbs';
import { Dispatch } from 'redux';
import {
  startLoading,
  stopLoading,
} from '../../Slices/General/Load/load.slice';
import { getTransactions } from '../../Slices/Transactions/transaction.slice';

export const TransactionAction = () => async (dispatch: Dispatch) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(startLoading());
    const response = await getRequest('transaction');
    const { rows } = response.data.data;
    dispatch(getTransactions({ rows }));
    dispatch(stopLoading());
    return response;
  } catch (error) {
    dispatch(stopLoading());
    console.error('Error fetching data:', error);
  }
};
