import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../Utils/Redux-Ts-Hooks/hooks';
import { ProfileAction } from '../../../Redux/Actions/Profile/profile.actions';
import {
  startLoading,
  stopLoading,
} from '../../../Redux/Slices/General/Load/load.slice';
import Loader from '../../General/Loader/loader';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { Icon } from '@chakra-ui/react'


const DashboardCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const { loading } = useAppSelector((state) => state.loader);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(ProfileAction());
        dispatch(startLoading());
      } catch (error) {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [dispatch]);

  const formattedBalance = Number(
    profile.UserAccount.balance,
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const timestamp = new Date(profile.UserAccount.updatedAt);
  const formattedDate = timestamp.toLocaleString();

  return (
    <>
      <div>
        {!loading && <Loader />}
        {loading && (
      <Card bg="#191919" color="white" borderRadius="40" w='18vw'>
            <CardBody>
              {/* <Stack divider={<StackDivider />} spacing="4"> */}
              <Box>
                <Center>
                <Flex>
                  <Heading size="xs" textTransform="uppercase">
                  {/* <Icon as={MdOutlineAttachMoney} boxSize={6}/> */}
                  Your Balance 
                  </Heading>
                  </Flex>
                </Center>
                <Text pt="2" fontSize="xl" align="center" color="bisque">
                  $ {formattedBalance}
                </Text>
              </Box>
              <Box alignItems="center">
                <Text pt="3" fontSize="xs" align="center" color="gray">
                  Last deposit made on:
                </Text>
                <Text fontSize="xs" align="center" color="gray">
                  {formattedDate}
                </Text>
              </Box>
              {/* </Stack> */}
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
};

export default DashboardCard;
