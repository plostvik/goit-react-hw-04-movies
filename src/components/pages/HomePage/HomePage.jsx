import React, { Component } from 'react';
import moviesApi from '../../services/movieApi.js';
import TrendingMovieList from './TrendingMovieList';
import styles from './HomePage.module.css';
import Notification from '../../Notification';
import Loader from '../../Loader';

export default class HomePage extends Component {
  state = {
    movies: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    moviesApi
      .getTrending()
      .then(data => this.setState({ movies: data.results }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    this.setState({ error: false });
  }

  render() {
    const { movies, error, loading } = this.state;
    return (
      <>
        <h1 className={styles.header}>Trending todays</h1>
        {loading && <Loader />}
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}
        <ul>
          {movies.map(movie => {
            return (
              <TrendingMovieList
                key={movie.id}
                title={movie.original_title}
                id={movie.id}
              />
            );
          })}
        </ul>
      </>
    );
  }
}
