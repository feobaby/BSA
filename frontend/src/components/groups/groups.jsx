import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import CircularIndeterminate from '../utils/spinner/spinner';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import './group.css';

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
      const deleteGroup = await axios.delete(`/group/${id}`);
      const { status } = deleteGroup.data;
      if (status === 204) alert.success('Successful');
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
      <p className="welcome-text">Here are all the groups you have created.</p>
      <h3 className="groups-text">
        {' '}
        No. of groups created: {groupscount.count}
      </h3>
      <br />
      <div>
        {groups.map((item) => (
          <div key={item.id} className="groups-box">
            <ul className="group-list-style">
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
                  <Link
                    to={{
                      pathname: `/update-group/${item.id}`,
                    }}
                  >
                    <FiEdit2 />
                  </Link>{' '}
                  <AiFillDelete
                    className="delete-icon"
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
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
