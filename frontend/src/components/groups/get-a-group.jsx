import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../services/axios';
import CircularIndeterminate from '../utils/spinner/spinner';
import { BiAddToQueue } from 'react-icons/bi';
import './group.css';

export default function Group() {
  const [oneGroup, setOneGroup] = useState([]);
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const fetchAGroup = async () => {
    setLoading(true);
    const res = await axios.get(`/group/${id}`);
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
