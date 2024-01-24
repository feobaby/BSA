import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react';
import { stopLoading } from '../../../Redux/Slices/General/Load/load.slice';
import { stopAlert } from '../../../Redux/Slices/General/Alert/alert.slice';
import { useAppDispatch } from '../../../Utils/Redux-Ts-Hooks/hooks';
import styles from '../../Auth/sign-up.module.css';

export const RenderAlert: React.FC = () => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleCloseButtonClick = () => {
    dispatch(stopLoading());
    dispatch(stopAlert());
  };
  return (
    <Alert status={errorMessage ? 'error' : 'success'}>
      <AlertIcon />
      <AlertDescription>{errorMessage || successMessage}</AlertDescription>
      <CloseButton
        as="button"
        bg="#2c2c2c"
        color="white"
        size="md"
        onClick={handleCloseButtonClick}
        className={styles.closeBtn}
      />
    </Alert>
  );
};
