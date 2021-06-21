import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import { FaMoneyCheck, FaFemale } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { HiUserGroup } from 'react-icons/hi';
import { BiArrowToTop } from 'react-icons/bi';
import CircularIndeterminate from '../utils/spinner/spinner';
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
      <p align="center" className="welcome-text">
        {' '}
        Welcome!{' '}
      </p>
      <div className="row">
        <div className="column">
          <div className="card">
            <div>
              {' '}
              <FaFemale className="imported-icons" />
            </div>
            <h3>Profile</h3>
            <p>
              {account.firstName} {account.lastName} <br />
              {account.email}
            </p>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div>
              {' '}
              <FiSettings className="imported-icons" />
            </div>
            <h3>Account</h3> profile settings:{' '}
            <Link to={{ pathname: '/settings' }}>click here</Link>
            <br />
            show transaction logs:{' '}
            <Link to={{ pathname: '/history' }}>click here</Link>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div>
              {' '}
              <FaMoneyCheck className="imported-icons" />
            </div>
            <h3>Current Balance</h3>
            <p>{account.balance}</p>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div>
              {' '}
              <BiArrowToTop className="imported-icons" />
            </div>
            <h3>Top up balance</h3>
            <Link to={{ pathname: '/add-money' }}>
              {' '}
              <p>click here</p>
            </Link>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div>
              {' '}
              <HiUserGroup className="imported-icons" />
            </div>
            <h3>Groups</h3>
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
