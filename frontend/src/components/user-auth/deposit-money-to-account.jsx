import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CircularIndeterminate from '../utils/spinner/spinner';
import axios from '../../services/axios';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { message as alert } from 'antd';
import 'antd/dist/antd.css';
import './deposit-money-to-account.css';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: 'grey',
        borderTop: '20%',
      },
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
    color: 'white',
    textAlign: 'center',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

export default function DepositToPersonalAccount() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    setLoading(true);
    const res = await axios.get('/account');
    setLoading(false);
    setBalance(res.data.data.balance);
  }, []);

  const onClick = () => {
    parseFloat(balance + amount).toFixed(2);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const depositMoneyData = await axios.patch('/add-money', {
        balance,
        amount,
      });
      const { status, message } = depositMoneyData.data;
      if (status === 200) {
        alert.success(message);
        history.push('/dashboard');
      }
    } catch (error) {
      setLoading(false);
    }
    onClick();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography variant="h3">
          Put some more cash into ya account.
        </Typography>
      </ThemeProvider>{' '}
      <br />
      {loading && <CircularIndeterminate />}
      <Container align="center">
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            style={{ width: '50%', color: '#ffffff' }}
            id="outlined-required"
            label="Current Balance"
            variant="outlined"
            value={balance}
            type="number"
            inputProps={{ readOnly: true }}
          />
          <TextField
            style={{ width: '50%', color: '#ffffff' }}
            id="outlined-required"
            label="Amount"
            variant="outlined"
            value={amount}
            type="number"
            onChange={(e) => setAmount(+e.target.value)}
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
          Top up
        </Button>
      </Container>
    </>
  );
}
