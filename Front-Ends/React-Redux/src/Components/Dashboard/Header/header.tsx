import React from 'react';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import styles from './header.module.css';
import { useAppSelector } from '../../../Utils/Redux-Ts-Hooks/hooks';


const Header: React.FC = () => {
  const { profile } = useAppSelector((state) => state.profile);

  return (
    <>
      <div style={{marginLeft: '23%', marginTop: '1%'}}>
          <Heading  fontSize="3xl" color='white'>Hello {profile.firstName} 👋🏾</Heading>
          <Text color='gray'>Good day and start sharing bills with your people today !</Text>
          <br />
          <Divider />
          <br />
          <Heading fontSize="xl" color='white'>Overview</Heading>
          <br />
      </div>
    </>
  );
};

export default Header;
