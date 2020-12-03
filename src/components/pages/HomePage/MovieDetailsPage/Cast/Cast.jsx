import React, { Component } from 'react';
import moviesApi from '../../../../services/movieApi.js';
import styles from './Cast.module.css';
import Notification from '../../../../../components/Notification';
import Loader from '../../../../Loader';

export default class Cast extends Component {
  state = {
    cast: null,
    error: null,
    loading: false,
  };

  componentDidMount() {
    const id = this.props.match.params.movieId;
    this.setState({ loading: true });
    moviesApi
      .getMovieCredits(id)
      .then(data => this.setState({ cast: data.cast }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    this.setState({ error: false });
  }

  render() {
    const { cast, error, loading } = this.state;
    return (
      <>
        {loading && <Loader />}
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}
        <ul>
          {cast &&
            cast.length > 0 &&
            cast.map(el => {
              let photo;
              el.profile_path
                ? (photo = `https://image.tmdb.org/t/p/w300/${el.profile_path}`)
                : (photo =
                    'https://via.placeholder.com/300x450.png?text=NO+PHOTO');

              return (
                <li key={el.id}>
                  <img
                    src={photo}
                    alt={el.original_name}
                    className={styles.photo}
                  />
                  <p className={styles.name}>{el.original_name}</p>
                  <p className={styles.name}>Character: {el.character}</p>
                </li>
              );
            })}
          {cast && !cast.length && (
            <li>
              Unfortunately we don't have cast infromation for this movie.
            </li>
          )}
        </ul>
      </>
    );
  }
}
