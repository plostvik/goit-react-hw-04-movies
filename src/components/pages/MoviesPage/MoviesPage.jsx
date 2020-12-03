import React, { Component } from 'react';
import TrendingMovieList from '../HomePage/TrendingMovieList';
import moviesApi from '../../services/movieApi.js';
import queryString from 'query-string';
import styles from './MoviesPage.module.css';
import Notification from '../../Notification';

export default class MoviesPage extends Component {
  state = {
    movies: [],
    inputValue: '',
    error: null,
  };

  componentDidMount() {
    const { query } = queryString.parse(this.props.location.search);
    if (query) {
      moviesApi
        .searchMovies(query)
        .then(data => this.setState({ movies: data.results }))
        .catch(error => this.setState({ error }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQueryParams } = queryString.parse(
      prevProps.location.search,
    );
    const { query: newQueryParams } = queryString.parse(
      this.props.location.search,
    );

    if (prevQueryParams !== newQueryParams) {
      moviesApi
        .searchMovies(newQueryParams)
        .then(data => this.setState({ movies: data.results }))
        .catch(error => this.setState({ error }));
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue) {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: `query=${this.state.inputValue}`,
      });
    }
    this.setState({ inputValue: '', error: null });
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const { movies, inputValue, error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <input
            type="text"
            name="search"
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Enter movie"
            className={styles.search}
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
        <ul>
          {error && (
            <Notification
              message={`Whoops, something went wrong: ${error.message}`}
            />
          )}
          {movies.map(movie => (
            <TrendingMovieList
              key={movie.id}
              title={movie.original_title}
              id={movie.id}
              location={this.props.location}
            />
          ))}
        </ul>
      </div>
    );
  }
}

// добавить проверку на пустой массив
