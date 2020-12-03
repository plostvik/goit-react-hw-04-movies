import React from 'react';
import { NavLink } from 'react-router-dom';
import router from '../../router.js';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <header className={styles.navigation}>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <NavLink
              exact
              to={router.home}
              className={styles.link}
              activeClassName={styles.active}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink
              exact
              to={router.movies}
              className={styles.link}
              activeClassName={styles.active}
            >
              Search
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navigation;
