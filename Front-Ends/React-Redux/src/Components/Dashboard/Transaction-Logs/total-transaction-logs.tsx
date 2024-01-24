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
import {
  startLoading,
  stopLoading,
} from '../../../Redux/Slices/General/Load/load.slice';
import { TransactionAction } from '../../../Redux/Actions/Transaction/transaction.action';
import Loader from '../../General/Loader/loader';

const Transactions: React.FC = () => {
  const { loading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();
  const { rows } = useAppSelector((state) => state.transactions);

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
      <div>
        {!loading && <Loader />}
        {loading && (
      <Card bg="#191919" color="white" borderRadius="40" w='18vw'>
            <CardBody>
              {/* <Stack divider={<StackDivider />} spacing="4"> */}
              <Box>
                <Center>
                  <Heading size="xs" textTransform="uppercase">
                    Total transactions
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
                  dd
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

export default Transactions;
