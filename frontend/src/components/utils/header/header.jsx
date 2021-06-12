import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './header.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link to={{ pathname: '/' }}> Home</Link>
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link to={{ pathname: '/add-money' }}> Add money to account</Link>
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link to={{ pathname: '/create-group' }}> Create a Group</Link>
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link to={{ pathname: '/add-group-money' }}>
              {' '}
              Add money to Group
            </Link>
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Edit a Group
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
