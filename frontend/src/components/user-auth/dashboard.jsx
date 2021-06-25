import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import SignOut from '../user-auth/sign-out';
import CircularIndeterminate from '../utils/spinner/spinner';
import standing from '../../assets/images/standing.png';
import group from '../../assets/images/group.png';
import cash from '../../assets/images/cash.png';
import give from '../../assets/images/give.png';
import './dashboard.css';

export default function Dashboard() {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAccount = async () => {
    setLoading(true);
    const res = await axios.get('/account');
    setLoading(false);
    setAccount(res.data.data);
  };

  useEffect(() => {
    fetchAccount();
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
      <SignOut />
      <p align="center" className="welcome-text">
        {' '}
        Welcome!{' '}
      </p>
      <div className="row">
        <div className="column">
          <div className="card">
            <div>
              <img
                src={standing}
                className="standing-photo"
                alt="profile picture"
              />
            </div>
            <p>
              {account.firstName} {account.lastName} <br />
              {account.email}
            </p>
            <Link to={{ pathname: '/settings' }}> Settings</Link>
            <br />
            <Link to={{ pathname: '/history' }}> Show logs</Link>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div>
              <img
                src={cash}
                className="standing-photo"
                alt="current balance picture"
              />
            </div>
            <p> Current balance: {account.balance}</p>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div>
              <img
                src={give}
                className="standing-photo"
                alt="top up balance picture"
              />
            </div>
            <Link to={{ pathname: '/add-money' }}>
              {' '}
              <p> Top up balance</p>
            </Link>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div>
              <img
                src={group}
                className="standing-photo"
                alt="current balance picture"
              />
            </div>
            <div>
              <p>
                Create a group:{' '}
                <Link to={{ pathname: '/create-group' }}>create</Link>
                <br />
                You created: <Link to={{ pathname: '/groups' }}>view</Link>
                <br />
                Part of:{'   '}
                <Link to={{ pathname: `/group/${account.email}` }}>view</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
