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

const ProfileGroupsPartOf: React.FC = () => {
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
        {!loading && <Loader />}
        {loading && (
      <Card bg="#191919" color="white" borderRadius="40" w='18vw'>
            <CardBody>
              {/* <Stack divider={<StackDivider />} spacing="4"> */}
              <Box>
                <Center>
                  <Heading size="xs" textTransform="uppercase">
                    Linked groups
                  </Heading>
                </Center>
                <Text pt="2" fontSize="xl" align="center" color="bisque">
                  $ ddd
                </Text>
              </Box>
              <Box alignItems="center">
                <Text pt="3" fontSize="xs" align="center" color="gray">
                  Last deposit made on:
                </Text>
                <Text fontSize="xs" align="center" color="gray">
               ddd
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

export default ProfileGroupsPartOf;
