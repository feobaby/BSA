import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl } from '../utils/baseURLs/baseurls';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SignOut() {
  const classes = useStyles();

  const logout = () => {
    window.localStorage.clear();
    window.location.href = baseUrl + 'sign-in';
  };
  return (
    <>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
        onClick={logout}
      >
        Log Out
      </Button>
    </>
  );
}
