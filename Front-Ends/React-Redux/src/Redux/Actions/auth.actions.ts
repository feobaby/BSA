import { postRequest } from '../Utils/Axios-Verbs/axios-verbs';
import { saveToken } from '../Utils/Storage/local.storage';
import { signUp } from '../Slices/auth.slice';
import { SignUpParameters } from './auth.types';
import { Dispatch } from 'redux';
import { startLoading, stopLoading } from '../Slices/load.slice';

export const userSignUp =
  (params: SignUpParameters) => async (dispatch: Dispatch) => {
    const { firstName, lastName, email, password } = params;
    dispatch(startLoading());
    try {
      const res = (
        await postRequest('auth/signup', {
          firstName,
          lastName,
          email,
          password,
        })
      ).data;
      await saveToken(res.token);
      dispatch(signUp({ USER_SIGN_UP: res.data }));
      return dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
    }
  };
