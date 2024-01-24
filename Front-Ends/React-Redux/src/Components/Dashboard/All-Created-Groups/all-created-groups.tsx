import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
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

const DashboardCreatedGroups: React.FC = () => {
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

  return (
    <>
      <div>
        {profile.GroupsCreatedByUser?.map((item) => (
          <Center>
            <Card>
              <CardHeader>
                <Heading size="md">Account Balance</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Name
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {item.name}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Overview
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Check out the overview of your clients.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Center>
        ))}
      </div>
    </>
  );
};

export default DashboardCreatedGroups;
