import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './home.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10%',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    marginTop: '3%',
    padding: '10px 25px',
    width: '12%',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" color="inherit" gutterBottom>
        Welcome to the Bill Sharing App.
      </Typography>
      <Typography variant="h6" color="inherit" gutterBottom>
        Good friends pays bills together. No one came to pay bills alone and
        die.
      </Typography>
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
