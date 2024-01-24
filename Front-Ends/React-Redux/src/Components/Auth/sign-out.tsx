import React from 'react';
import { Box } from '@chakra-ui/react';
import { userSignOut } from '../../Redux/Actions/Auth/auth.actions';
import { useAppDispatch } from '../../Utils/Redux-Ts-Hooks/hooks';
import styles from './auth.module.css';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(userSignOut());
    window.location.replace('/signin');
  };
  return (
    <>
      <div className={styles.cursor}>
        <Box
          // as="button"
          borderRadius="md"
          px={4}
          h={8}
          onClick={handleLogOut}
        >
          {' '}
          <p>Sign out</p>
        </Box>
      </div>
    </>
  );
};

export default Header;
