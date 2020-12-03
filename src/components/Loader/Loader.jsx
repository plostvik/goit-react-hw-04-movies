import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Spinner from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.spinner}>
    <Spinner type="Oval" color="tomato" height={50} width={100} />
  </div>
);

export default Loader;
