import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './home.css';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '3%',
    padding: '10px 25px',
    width: '20%',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div align="center" className="home-div">
      <p className="home-welcome-text text-shadow-pop-top">
        Welcome to the Bill Sharing App.
      </p>
      <p className="home-little-text">
        Good friends pays bills together. No one came to pay bills alone and
        die.
      </p>
      <Button
        variant="contained"
        component={Link}
        to="/sign-in"
        className={classes.button}
      >
        Sign in
      </Button>{' '}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/sign-up"
        className={classes.button}
      >
        Sign up
      </Button>
    </div>
  );
}
