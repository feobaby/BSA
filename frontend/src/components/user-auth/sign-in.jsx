import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CircularIndeterminate from '../utils/spinner/spinner';
import axios from '../../services/axios';
import { message as alert } from 'antd';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './sign-in.css';
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

export default function Login() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setEmailError(false);
      setPasswordError(false);

      if (email == '') {
        return setEmailError(true);
      } else if (password == '') {
        return setPasswordError(true);
      }
      setLoading(true);
      const userData = await axios.post('/auth/signin', {
        email,
        password,
      });
      const { status, token } = userData.data;
      if (status === 200) {
        localStorage.setItem('token', token);
        window.location.replace('/dashboard');
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        alert.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <br /> <br />
      <p className="sign-in-text">Hey buddy! Nice to have you back.</p>
      {loading && <CircularIndeterminate />}
      <Container align="center">
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            required
            error={emailError}
            style={{ width: '50%' }}
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
            required
            error={passwordError}
            style={{ width: '50%' }}
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
          <br />
        </form>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/sign-up"
          className={classes.button}
        >
          Sign Up
        </Button>
      </Container>
    </>
  );
}
