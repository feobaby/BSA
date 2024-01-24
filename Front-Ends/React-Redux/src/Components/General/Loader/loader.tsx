import React from 'react';
import styles from './loader.module.css';

const Loader: React.FC = () => {
  return (
    <>
      <div>
        <p className={styles.loader} />
      </div>
    </>
  );
};

export default Loader;
