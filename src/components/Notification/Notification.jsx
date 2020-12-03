import React from 'react';
import style from './Notification.module.css';
import PropTypes from 'prop-types';

export default function Notification({ message }) {
  return <h2 className={style.notification}>{message}</h2>;
}

Notification.propTypes = {
  message: PropTypes.string,
};

Notification.defaultPros = {
  message: 'Whoops, something went wrong!',
};
