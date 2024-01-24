import { postRequest } from '../../../Utils/Axios-Verbs/axios-verbs';
import { removeToken, saveToken } from '../../../Utils/Storage/local.storage';
import { signUp, signOut } from '../../Slices/Auth/auth.slice';
import { AuthParameters } from '../../../Utils/Types/auth.types';
import { Dispatch } from 'redux';

export const userSignUpAction =
  (params: AuthParameters) => async (dispatch: Dispatch) => {
    try {
      const response = await postRequest('auth/signup', {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        password: params.password,
      });
      if (response.status === 201) {
        saveToken(response.data.token);
      }
      dispatch(signUp({ USER_SIGN_UP: response.data }));
      window.location.replace('/dashboard');
      return response;
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
    }
  };

export const userSignOut = () => (dispatch: Dispatch) => {
  removeToken();
  dispatch(signOut({ USER_SIGN_OUT: {} }));
};

export const userSignInAction =
  (params: AuthParameters) => async (dispatch: Dispatch) => {
    try {
      const response = await postRequest('auth/signin', {
        email: params.email,
        password: params.password,
      });
      if (response.status === 200) {
        saveToken(response.data.token);
      }
      dispatch(signUp({ USER_SIGN_IN: response.data }));
      window.location.replace('/dashboard');
      return response;
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
    }
  };
