import React, { useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../Utils/Redux-Ts-Hooks/hooks';
import { userSignInAction } from '../../Redux/Actions/Auth/auth.actions';
import styles from './auth.module.css';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,
  Button,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import {
  startLoading,
  stopLoading,
} from '../../Redux/Slices/General/Load/load.slice';
import { showAlert } from '../../Redux/Slices/General/Alert/alert.slice';

const SignIn: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { loading } = useAppSelector((state) => state.loader);

  const { alert } = useAppSelector((state) => state.alert);

  const handleCloseButtonClick = () => {
    dispatch(showAlert());
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: any) => {
    try {
      dispatch(startLoading());
      e.preventDefault();
      const { email, password } = formData;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await dispatch(userSignInAction({ email, password }));
    } catch (error: any) {
      dispatch(stopLoading());
      if (error.response.status === 401) {
        dispatch(showAlert());
        setErrorMessage('Your email and/or password might be incorrect.');
        return;
      }
    }
  };
  return (
    <>
      {alert && (
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
      )}

      <Center>
        <Box w="40%" p={4} className={styles.boxCenter}>
          <Stack>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                focusBorderColor="#F2D2BD"
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="text"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                focusBorderColor="#F2D2BD"
              />
            </FormControl>
            <Center>
              <u>Forgot Password?</u>
            </Center>
          </Stack>
        </Box>
      </Center>
      <div>
        <Center>
          <Button
            isLoading={loading}
            loadingText="Loading"
            size="md"
            onClick={handleFormSubmit}
            bg="#F2D2BD"
          >
            Sign In
          </Button>
        </Center>
      </div>
    </>
  );
};

export default SignIn;
