import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import CircularIndeterminate from '../utils/spinner/spinner';
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
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

export default function PartGroups(props) {
  const [group, setGroups] = useState([]);
  const [groupscount, setGroupsCount] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGroup = async () => {
    setLoading(true);
    // eslint-disable-next-line react/prop-types
    const res = await axios.get(`/group?email=${props.match.params.email}`);
    setLoading(false);
    setGroups(res.data.data.rows);
    setGroupsCount(res.data.data);
  };

  useEffect(() => {
    fetchGroup();
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
        <Typography variant="h3">
          Here are all the groups you have been added to.
        </Typography>{' '}
        <h3 className="groups-text">
          {' '}
          No. of groups you are part of: {groupscount.count}
        </h3>
      </ThemeProvider>{' '}
      <div></div>
      {group.map((item) => (
        <div key={item.id} className="groups-box">
          <ul>
            <li>
              <h2 className="groups-inner-text">
                Name:{' '}
                <Link
                  to={{
                    pathname: `/one-group/${item.id}`,
                  }}
                >
                  {item.name}
                </Link>
              </h2>
            </li>
            <li>
              {' '}
              <h5 className="groups-inner-text">
                Description: {item.description}
              </h5>
            </li>
            <li>
              {' '}
              <h5 className="groups-inner-text">
                Current group balance: {item.groupBalance}
              </h5>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}
