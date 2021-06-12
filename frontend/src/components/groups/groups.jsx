import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import CircularIndeterminate from '../utils/spinner/spinner';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
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

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupscount, setGroupsCount] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGroups = async () => {
    setLoading(true);
    const res = await axios.get('/groups');
    setLoading(false);
    setGroups(res.data.data.rows);
    setGroupsCount(res.data.data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (loading) {
    return (
      <div>
        <CircularIndeterminate />
      </div>
    );
  }

  const deleteGroup = async (id) => {
    try {
      event.preventDefault();
      setLoading(true);
      const delResource = await axios.delete(`/group/${id}`);
      const { message, status } = delResource.data;
      if (status === '200') alert.success(message);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      if (error.response.status === 404)
        alert.error(error.response.data.message);
      else alert.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography variant="h3">
          Here are all the groups you have created.
        </Typography>{' '}
        <h3 className="groups-text">
          {' '}
          No. of groups created: {groupscount.count}
        </h3>
      </ThemeProvider>{' '}
      <br />
      <div>
        {groups.map((item) => (
          <div key={item.id} className="groups-box">
            <ul>
              {' '}
              <li>
                {' '}
                <h2 className="groups-inner-text">
                  {' '}
                  Name:{' '}
                  <Link
                    to={{
                      pathname: `/one-group/${item.id}`,
                    }}
                  >
                    {' '}
                    {item.name}{' '}
                  </Link>
                  <AiOutlineUsergroupDelete
                    onClick={(e) => {
                      const r = window.confirm(
                        'Do you really want to delete this group?',
                      );
                      if (r == true) deleteGroup(item.id);
                    }}
                  />
                </h2>
              </li>{' '}
              <li>
                {' '}
                <h2 className="groups-inner-text">
                  {' '}
                  Description: {item.description}
                </h2>
              </li>
              <hr />
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
