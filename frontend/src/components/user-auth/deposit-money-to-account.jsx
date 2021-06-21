import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CircularIndeterminate from '../utils/spinner/spinner';
import axios from '../../services/axios';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { message as alert } from 'antd';
import 'antd/dist/antd.css';
import './deposit-money.css';

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

export default function DepositToPersonalAccount() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    setLoading(true);
    const res = await axios.get('/account');
    setLoading(false);
    setBalance(res.data.data.balance);
  }, []);

  const calculatePersonalBalance = () => {
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
    calculatePersonalBalance();
  };

  return (
    <>
      <p className="welcome-text"> Put some more cash into ya account.</p>
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
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <TextField
            style={{ width: '50%', color: '#ffffff' }}
            id="outlined-required"
            label="Amount"
            variant="outlined"
            value={amount}
            type="number"
            onChange={(e) => setAmount(+e.target.value)}
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
          Top up
        </Button>
      </Container>
    </>
  );
}
