import { Dispatch } from 'redux';
import { AccountParameters } from '../../Utils/Types/account.types';
import { putRequest } from '../../Utils/Axios-Verbs/axios-verbs';
import { addMoney } from '../Slices/Account/account.slice';

export const userAddMoneyAction =
  (params: AccountParameters) => async (dispatch: Dispatch) => {
    try {
      const response = await putRequest('account/deposit-wallet', {
        amount: params.amount,
      });
      dispatch(addMoney({ User_Add_Money: response.data }));
      window.location.replace('/dashboard');
      return response;
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
    }
  };
