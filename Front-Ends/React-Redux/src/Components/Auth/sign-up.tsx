import React, { useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../Utils/Redux-Ts-Hooks/hooks';
import { userSignUpAction } from '../../Redux/Actions/Auth/auth.actions';
import styles from './auth.module.css';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,
  Button,
  Stack,
  Checkbox,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import {
  startLoading,
  stopLoading,
} from '../../Redux/Slices/General/Load/load.slice';
import {
  showAlert,
  stopAlert,
} from '../../Redux/Slices/General/Alert/alert.slice';

const SignUp: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const { loading } = useAppSelector((state) => state.loader);
  const { alert } = useAppSelector((state) => state.alert);

  const dispatch = useAppDispatch();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleCloseButtonClick = () => {
    dispatch(stopLoading());
    dispatch(stopAlert());
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: any) => {
    try {
      dispatch(startLoading());
      const { firstName, lastName, email, password, confirmPassword } =
        formData;
      e.preventDefault();
      if (!isChecked) {
        dispatch(showAlert());
        setErrorMessage('Please read the T & Cs and click on the checkbox.');
        return;
      }
      if (password !== confirmPassword) {
        dispatch(showAlert());
        setErrorMessage('The passwords do not match.');
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await dispatch(
        userSignUpAction({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      );
      if (response.status === 201) {
        dispatch(showAlert());
        setSuccessMessage('Welcome!');
        return;
      }
    } catch (error: any) {
      dispatch(stopLoading());
      if (error.response.status === 409) {
        dispatch(showAlert());
        setErrorMessage('Sorry, but you will have to choose another email.');
        return;
      } else {
        dispatch(showAlert());
        setErrorMessage('Please try again, an error occured.');
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
              <FormLabel>First Name</FormLabel>
              <Input
                className={styles.formInput}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                focusBorderColor="#F2D2BD"
                required
              />
            </FormControl>
            <FormControl />
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                className={styles.formInput}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                focusBorderColor="#F2D2BD"
                required
              />
            </FormControl>
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
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                focusBorderColor="#F2D2BD"
              />
            </FormControl>
            <Stack>
              <Center>
                <Checkbox
                  _checked={{
                    '& .chakra-checkbox__control': { background: '#FFF' },
                  }}
                  borderColor="#FFF"
                  iconColor="black"
                  isChecked={isChecked}
                  onChange={handleCheckboxChange}
                >
                  Are all <u>Terms and Conditions</u> read?
                </Checkbox>
              </Center>
            </Stack>
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
            Sign Up
          </Button>
        </Center>
      </div>
    </>
  );
};

export default SignUp;
