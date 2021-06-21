import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import CircularIndeterminate from '../utils/spinner/spinner';
import 'antd/dist/antd.css';

export default function TransactionHistory() {
  const [transhistory, setTransHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransHistory = async () => {
    setLoading(true);
    const result = await axios.get('/history');
    setTransHistory(result.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransHistory();
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
      <p className="welcome-text">Here are all your transaction logs.</p>
      {transhistory.map((item) => (
        <div key={item.id} className="groups-box">
          <ul>
            <li>
              {' '}
              You deposited {item.amount} to either your personal account or to
              a group on {item.createdAt}
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}
