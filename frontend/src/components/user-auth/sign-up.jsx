import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import CircularIndeterminate from '../utils/spinner/spinner';
import axios from '../../services/axios';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { message as alert } from 'antd';
import 'antd/dist/antd.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'grey',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //errors
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setFirstNameError(false);
      setLastNameError(false);
      setEmailError(false);
      setPasswordError(false);

      if (firstName == '') {
        return setFirstNameError(true);
      } else if (lastName == '') {
        return setLastNameError(true);
      } else if (email == '') {
        return setEmailError(true);
      } else if (password == '') {
        return setPasswordError(true);
      }
      setLoading(true);
      const userData = await axios.post('/auth/user', {
        firstName,
        lastName,
        email,
        password,
      });
      const { status, token } = userData.data;
      if (status === 201) {
        localStorage.setItem('token', token);
        window.location.replace('/dashboard');
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 409) {
        alert.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <p className="welcome-text">Join Us!</p>
      {loading && <CircularIndeterminate />}
      <Container align="center">
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            style={{ width: '50%', color: '#ffffff' }}
            required
            error={firstNameError}
            id="outlined-required"
            label="First Name"
            variant="outlined"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <br />
          <TextField
            style={{ width: '50%', color: '#ffffff' }}
            required
            error={lastNameError}
            id="outlined-required"
            label="Last Name"
            value={lastName}
            placeholder="Last Name"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <br />
          <TextField
            style={{ width: '50%', color: '#ffffff' }}
            required
            error={emailError}
            id="outlined-required"
            label="Email"
            variant="outlined"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <br />
          <TextField
            style={{ width: '50%', color: '#ffffff' }}
            required
            error={passwordError}
            id="outlined-required"
            label="Password"
            variant="outlined"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
        </form>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          className={classes.button}
        >
          Go Home
        </Button>
      </Container>
    </>
  );
}
