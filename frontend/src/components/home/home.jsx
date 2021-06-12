import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './home.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '43%',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <h1 className="primary-welcome-text">Welcome to the Bill Sharing App.</h1>
      <h3 className="secondary-text">
        Good friends pays bills together. No one came to pay bills alone and
        die.
      </h3>

      {/* Button Section */}
      <div className={classes.root}>
        <Link to={{ pathname: '/sign-in' }}>
          <Button variant="contained">Sign in</Button>
        </Link>{' '}
        <Button variant="contained" color="primary">
          <Link to={{ pathname: '/sign-up' }}>Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
