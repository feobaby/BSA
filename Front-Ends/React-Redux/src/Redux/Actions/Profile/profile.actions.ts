import { getRequest } from '../../../Utils/Axios-Verbs/axios-verbs';
import { Dispatch } from 'redux';
import { getProfile } from '../../Slices/Profile/profile.slice';
import {
  startLoading,
  stopLoading,
} from '../../Slices/General/Load/load.slice';

export const ProfileAction = () => async (dispatch: Dispatch) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(startLoading());
    const response = await getRequest('auth/profile');
    const { id, firstName, UserAccount, GroupsCreatedByUser } =
      response.data.data;
    dispatch(getProfile({ id, firstName, UserAccount, GroupsCreatedByUser }));
    dispatch(stopLoading());
    return response;
  } catch (error) {
    dispatch(stopLoading());
    console.error('Error fetching data:', error);
  }
};
