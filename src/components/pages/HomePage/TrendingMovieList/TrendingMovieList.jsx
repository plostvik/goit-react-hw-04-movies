import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../../../router.js';
import styles from './TrendingMovieList.module.css';

const TrendingMovieList = ({ title, id, location }) => {
  return (
    <>
      <li className={styles.movie}>
        <Link
          to={{
            pathname: `${routes.movies}${id}`,
            state: { from: location },
          }}
          className={styles.link}
        >
          {title}
        </Link>
      </li>
    </>
  );
};

TrendingMovieList.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default TrendingMovieList;
