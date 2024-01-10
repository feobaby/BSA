import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import styles from './header.module.css';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className={styles.bodybG}>
        <Box maxW="40rem" p={10}>
          <Heading size="4xl">Dashbaord👋🏾 </Heading>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
