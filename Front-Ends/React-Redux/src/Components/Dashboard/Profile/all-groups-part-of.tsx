import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../Utils/Redux-Ts-Hooks/hooks';
import { ProfileAction } from '../../../Redux/Actions/Profile/profile.actions';
import {
  startLoading,
  stopLoading,
} from '../../../Redux/Slices/General/Load/load.slice';
import Loader from '../../General/Loader/loader';
import styles from './profile.module.css';

const AllGroupspartOf: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const { loading } = useAppSelector((state) => state.loader);

  return (
    <>
      <div>
<p className={styles.cursor}>All Groups You are Part of</p>
      </div>
    </>
  );
};

export default AllGroupspartOf;
