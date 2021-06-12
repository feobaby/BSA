import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import CircularIndeterminate from '../utils/spinner/spinner';
import { BiAddToQueue } from 'react-icons/bi';
import './group.css';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
    color: 'white',
    textAlign: 'center',
    marginBottom: '3%',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};

export default function Group(props) {
  const [oneGroup, setOneGroup] = useState([]);
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAGroup = async () => {
    setLoading(true);
    // eslint-disable-next-line react/prop-types
    const res = await axios.get(`/group/${props.match.params.id}`);
    setLoading(false);
    setOneGroup(res.data.data);
    setGroup(res.data.data.emails);
  };

  useEffect(() => {
    fetchAGroup();
  }, []);

  if (loading) {
    return (
      <div>
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography variant="h3">Hiya 👋</Typography>{' '}
      </ThemeProvider>{' '}
      <div className="groups-box">
        {' '}
        <p className="group-text">
          {' '}
          {oneGroup.name}{' '}
          <Link
            to={{
              pathname: `/group-money/${oneGroup.id}`,
            }}
          >
            <BiAddToQueue />
          </Link>
        </p>
        <hr />
        <p className="group-descrip"> {oneGroup.description}</p>
        <br />
        <p className="group-inner-text">Money goals: {oneGroup.goalBalance}</p>
        <p className="group-inner-text">
          {' '}
          Contributed money: {oneGroup.groupBalance}
        </p>
        <p className="group-inner-text"> Category: {oneGroup.category}</p>
        <br />
        <p className="group-inner-text-for-emails"> Emails added:</p>
        {group.map((emails, item) => (
          <option className="group-inner-text" key={item}>
            {emails}
          </option>
        ))}
      </div>
    </>
  );
}
