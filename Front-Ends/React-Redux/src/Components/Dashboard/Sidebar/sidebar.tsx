import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../../Utils/Redux-Ts-Hooks/hooks';
import {
  startLoading,
  stopLoading,
} from '../../../Redux/Slices/General/Load/load.slice';
import { TransactionAction } from '../../../Redux/Actions/Transaction/transaction.action';
import styles from './sidebar.module.css';
import SignOut from '../../Auth/sign-out';
import AddMoney from '../Add-Money/add-money';
import { MdOutlineAttachMoney, MdOutlineLogout, MdCreateNewFolder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Group from '../Profile/groups';
import ViewTransactionLogs from '../Transaction-Logs/view-transaction-logs';
import { MdOutlineViewList, MdArrowDropDown } from "react-icons/md";
import ViewProfile from '../Profile/view-profile';
import { TiUser } from "react-icons/ti";


const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(TransactionAction());
        dispatch(startLoading());
      } catch (error) {
        dispatch(stopLoading());
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {/* <div className={styles.sideBarContainer}> */}
      <Stack spacing='20px' h='100vh' w='20%' position='fixed' className={styles.sideBarContainer}>

        <Box p={10} color="#F2D2BD">
            <Heading size="xl" textAlign='center' >
              B.S.A
            </Heading>
        </Box>
        <Divider />
        <br />
        <Box>
          <Flex flexDirection="row" color="gray">
            <TiUser className={styles.sideBarIcons} />
            <ViewProfile />
          </Flex>{' '}
        </Box>
        <br />
        <Flex flexDirection="row" color="gray">
            <MdOutlineAttachMoney className={styles.sideBarIcons} />
            <AddMoney />
            </Flex>
        <br />
        <Box>
          <Flex flexDirection="row" color="gray">
            <MdArrowDropDown className={styles.sideBarIcons} />
            <Group />
          </Flex>{' '}
        </Box>
        <br />
        <Box>
          <Flex flexDirection="row" color="gray">
            <MdOutlineViewList className={styles.sideBarIcons} />
            <ViewTransactionLogs />
          </Flex>{' '}
        </Box>
        <br />
        <Box>
          <Flex flexDirection="row" color="gray">
            <MdOutlineLogout className={styles.sideBarIcons} />
            <SignOut />
          </Flex>
        </Box>
        {/* </div> */}
        </Stack>
    </>
  );
};

export default Sidebar;
