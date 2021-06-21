import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../services/axios';
import CircularIndeterminate from '../utils/spinner/spinner';
import './group.css';

export default function PartGroups(props) {
  const [group, setGroups] = useState([]);
  const [groupscount, setGroupsCount] = useState([]);
  const [loading, setLoading] = useState(false);

  const { email } = useParams();

  const fetchGroup = async () => {
    setLoading(true);
    const res = await axios.get(`/group?email=${email}`);
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
      <p className="welcome-text">Here are all the groups you are part of.</p>
      <h3 className="groups-text">
        {' '}
        No. of groups you are part of: {groupscount.count}
      </h3>
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
            <li>
              {' '}
              <h5 className="groups-inner-text">
                Group Money Goals: {item.goalBalance}
              </h5>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}
