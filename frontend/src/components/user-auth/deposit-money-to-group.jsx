import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CircularIndeterminate from '../utils/spinner/spinner';
import axios from '../../services/axios';
import { message as alert } from 'antd';
import 'antd/dist/antd.css';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

export default function DepositToGroupAccount(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [goalBalance, setGoalBalance] = useState(0);
  const [groupBalance, setGroupBalance] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    setLoading(true);
    // eslint-disable-next-line react/prop-types
    const res = await axios.get(`/group/${props.match.params.id}`);
    const resAcc = await axios.get('/account');
    setLoading(false);
    setGoalBalance(res.data.data.goalBalance);
    setGroupBalance(res.data.data.groupBalance);
    setBalance(resAcc.data.data.balance);
    console.log(resAcc.data.data.balance);
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      await axios.patch(
        // eslint-disable-next-line react/prop-types
        `/group/add-money/${props.match.params.id}`,
        {
          groupBalance,
          goalBalance,
          amount,
        },
      );
      const editBalance = await axios.patch('/account', {
        balance,
      });
      console.log(editBalance);
      // await axios.patch('/account', { balance });
      const { status, message } = editBalance.data;
      if (status === 200) {
        alert.success(message);
        history.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      // if (error.response.status === 400) {
      //   alert.error(error.response.data.error);
      // }
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography variant="h3">Put some cash in ya group.</Typography>
      </ThemeProvider>{' '}
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
          />
          <br />
          <TextField
            style={{ width: '50%' }}
            id="outlined-required"
            label="Group's Goal Balance"
            variant="outlined"
            type="number"
            value={goalBalance}
            inputProps={{ readOnly: true }}
          />
          <br />
          <TextField
            style={{ width: '50%' }}
            id="outlined-required"
            label="Group's Current Balance"
            variant="outlined"
            type="number"
            value={groupBalance}
            inputProps={{ readOnly: true }}
          />
          <br />
          <TextField
            style={{ width: '50%' }}
            id="outlined-required"
            label="Deposit Amount"
            variant="outlined"
            type="number"
            value={amount}
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
          Deposit
        </Button>
      </Container>
    </>
  );
}
