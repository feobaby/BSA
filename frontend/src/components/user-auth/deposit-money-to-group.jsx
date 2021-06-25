import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CircularIndeterminate from '../utils/spinner/spinner';
import axios from '../../services/axios';
import { message as alert } from 'antd';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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

export default function DepositToGroupAccount() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [goalBalance, setGoalBalance] = useState(0);
  const [groupBalance, setGroupBalance] = useState(0);
  const [balance, setBalance] = useState(0);

  const { id } = useParams();

  const fetchAccount = async () => {
    setLoading(true);
    const res = await axios.get(`/group/${id}`);
    const resAcc = await axios.get('/account');
    setLoading(false);
    setGoalBalance(res.data.data.goalBalance);
    setGroupBalance(res.data.data.groupBalance);
    setBalance(resAcc.data.data.balance);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const newPersonalBalance = parseFloat(balance - amount);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      if (amount > balance) {
        setLoading(false);
        return alert.error('Insufficient balance.');
      }
      const depositGroupMoney = await axios.patch(`/group/add-money/${id}`, {
        groupBalance,
        goalBalance,
        amount,
      });
      await axios.patch('/account', {
        balance: newPersonalBalance,
      });
      const { status, message } = depositGroupMoney.data;
      if (status === 200) {
        alert.success(message);
        history.push('/dashboard');
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) {
        alert.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <p className="welcome-text">Put some cash in ya group.</p>
      {loading && <CircularIndeterminate />}
      <Container align="center">
        <form className={classes.root} onSubmit={handleSubmit}>
          <br />
          <TextField
            style={{ width: '50%' }}
            id="outlined-required"
            label="Personal Balance"
            variant="outlined"
            type="number"
            value={balance}
            inputProps={{ readOnly: true }}
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <br />
          <TextField
            style={{ width: '50%' }}
            id="outlined-required"
            label="Group's Goal Balance"
            variant="outlined"
            type="number"
            min="1"
            value={goalBalance}
            inputProps={{ readOnly: true }}
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <br />
          <TextField
            style={{ width: '50%' }}
            id="outlined-required"
            label="Group's Current Balance"
            variant="outlined"
            type="number"
            min="1"
            value={groupBalance}
            inputProps={{ readOnly: true }}
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <br />
          <TextField
            style={{ width: '50%' }}
            id="outlined-required"
            label="Deposit Amount"
            variant="outlined"
            type="number"
            min="1"
            value={amount}
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
          Deposit
        </Button>
      </Container>
    </>
  );
}
