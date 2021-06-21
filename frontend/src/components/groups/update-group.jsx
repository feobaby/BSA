import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../services/axios';
import CircularIndeterminate from '../utils/spinner/spinner';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { message as alert } from 'antd';
import './group.css';
import 'antd/dist/antd.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    color: 'white',
  },
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

export default function UpdateGroup(props) {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [emails, setEmails] = useState([]);
  const [description, setDescription] = useState('');
  const [goalBalance, setGoalBalance] = useState('');

  const { id } = useParams();

  useEffect(async () => {
    setLoading(true);
    // eslint-disable-next-line react/prop-types
    const res = await axios.get(`/group/${id}`);
    setLoading(false);
    setName(res.data.data.name);
    setCategory(res.data.data.category);
    setEmails(res.data.data.emails);
    setDescription(res.data.data.description);
    setGoalBalance(res.data.data.goalBalance);
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const updateGroup = await axios.patch(
        // eslint-disable-next-line react/prop-types
        `/group/${props.match.params.id}`,
        {
          name,
          category,
          emails,
          description,
          goalBalance,
        },
      );
      const { status, message } = updateGroup.data;
      if (status === 200) {
        alert.success(message);
        history.push('/groups');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response.status === 400) {
        alert.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      {loading && <CircularIndeterminate />}
      <Container align="center">
        <p align="center" className="welcome-text">
          {' '}
          Update a Group.{' '}
        </p>
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            style={{ width: '52%' }}
            id="outlined-required"
            label="Name"
            variant="outlined"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <br />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ width: '52%' }}
          >
            <InputLabel
              htmlFor="outlined-age-native-simple"
              style={{ color: '#ffffff' }}
            >
              Category
            </InputLabel>
            <Select
              native
              value={category}
              variant="outlined"
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              inputProps={{
                style: { color: '#fff' },
              }}
            >
              <option aria-label="None" value="" />
              <option value="Home Bills">Home Bills</option>
              <option value="Functions">Functions</option>
              <option value="Trips">Trips</option>
              <option value="Movies">Movies</option>
            </Select>
          </FormControl>
          <br />
          <TextareaAutosize
            style={{
              width: '52%',
              backgroundColor: '#1D2026',
              borderRadius: '4px',
            }}
            id="outlined-required"
            label="Add Emails"
            variant="outlined"
            value={emails}
            placeholder="Add all the emails you want for a group(including yours), and separate each with a comma
            for example: youremail@email.com,anotheremail@email.com"
            onChange={(e) =>
              setEmails(e.target.value.split(' ').join('').split(','))
            }
          />
          <br />
          <TextareaAutosize
            style={{
              width: '52%',
              backgroundColor: '#1D2026',
              borderRadius: '4px',
            }}
            id="outlined-required"
            label="Description"
            variant="outlined"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <TextField
            style={{ width: '52%' }}
            id="outlined-required"
            label="Money Goals"
            variant="outlined"
            value={goalBalance}
            placeholder="Money Goals"
            onChange={(e) => setGoalBalance(+e.target.value)}
            type="number"
            InputProps={{
              style: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <br />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </form>
      </Container>
    </>
  );
}
