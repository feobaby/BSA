import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './not-found.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function NotFoundPage() {
  const classes = useStyles();
  return (
    <div align="center">
      <p className="not-found-page">
        Wahala be like error 404.
        <br />
        Page not found.
      </p>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        className={classes.button}
      >
        Take me back home
      </Button>
    </div>
  );
}
