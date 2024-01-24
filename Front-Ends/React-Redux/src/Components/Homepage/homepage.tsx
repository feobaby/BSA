import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  Center,
} from '@chakra-ui/react';
import styles from './homepage.module.css';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
  return (
    <>
      <Container className={styles.header}>
        <Box maxW="40rem" p={10}>
          <Heading size="2xl" className={styles.hiMessage}>
            HI!👋🏾{' '}
          </Heading>
          <br />
          <Box bg="#F2D2BD" color="#000" p={25}>
            <Heading size="3xl" className={styles.hiMessage}>
              This is B.S.A
            </Heading>
          </Box>
          <br />
          <Text fontSize="xl" className={styles.hiMessage}>
            BSA is a simple bill sharing application designed for individuals to
            collectively contribute funds for various purposes!
          </Text>
          <Center>
            <Link to="/signup">
              <Button size="lg" bg="#F2D2BD" mt="24px">
                Get Started
              </Button>{' '}
            </Link>
            &nbsp;
            <Link to="/signin">
              <Button size="lg" bg="#F2D2BD" mt="24px">
                Sign in
              </Button>
            </Link>
          </Center>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;
