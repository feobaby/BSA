import React from 'react';
import DashboardCard from '../Account-Balance/account-balance';
import ProfileGroupsCreated from '../Profile/total-groups-created';
import Transactions from '../Transaction-Logs/total-transaction-logs';
import Sidebar from '../Sidebar/sidebar';
import ProfileGroupsPartOf from '../Profile/total-groups-part-of';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../Header/header';
import LineChartAnalytics from '../../Analytics/Line-Chart/line-chart';


const Dashboard: React.FC = () => {
  return (
    <>
      <Flex flexDirection='column'>
        <Sidebar />
        <Header />
        <Flex flexDirection='row' gap={5} style={{ marginLeft: '23%', flexWrap: 'wrap' }}>
          <DashboardCard />
          <ProfileGroupsCreated />
          <ProfileGroupsPartOf />
          <Transactions />
        </Flex>
        <br />
        <Flex flexDirection='row' gap={5} style={{ marginLeft: '23%', flexWrap: 'wrap' }}>
        <Box bg='#131313'><LineChartAnalytics/></Box>
        <Box bg='#131313'><LineChartAnalytics/></Box>
        </Flex>
      </Flex>
    </>
  );
};


export default Dashboard;
