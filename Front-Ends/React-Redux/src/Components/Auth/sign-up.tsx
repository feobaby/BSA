import React, { useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../Redux/Utils/Redux-Ts-Hooks/hooks';
import { userSignUp } from '../../Redux/Actions/auth.actions';
import styles from './sign-up.module.css';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,
  Button,
  Stack,
  Checkbox,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const SignUp: React.FC = () => {
  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const { loading } = useAppSelector((state) => state.load);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!isChecked) {
        setShowAlert(true);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const { firstName, lastName, email, password } = formData;
      dispatch(userSignUp({ firstName, lastName, email, password }));
      navigate('/dash');
    } catch (error) {
      console.error(error);
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Email/ Password Did Not Matched.</AlertDescription>
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
                id="fname"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                focusBorderColor="#F2D2BD"
                required
              />
              <FormControl />
              <br />
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  className={styles.formInput}
                  type="text"
                  id="lname"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  focusBorderColor="#F2D2BD"
                  required
                />
              </FormControl>
              <br />
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
              <br />
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
              <br />
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
            </FormControl>
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
