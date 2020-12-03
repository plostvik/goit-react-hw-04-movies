import React from 'react';
import styles from './NotFounPage.module.css';
import { Link } from 'react-router-dom';

const NotFounPage = props => (
  <div className={styles.wrapper}>
    <div title="404" className={styles.div}>
      404
    </div>
    <p className={styles.desc}>
      Кажется, вы потерялись! Попробуйте поискать <Link to="/">тут</Link>
    </p>
  </div>
);

export default NotFounPage;
