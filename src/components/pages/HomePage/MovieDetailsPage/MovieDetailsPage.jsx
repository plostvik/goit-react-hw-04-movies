import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import moviesApi from '../../../services/movieApi.js';
import routes from '../../../../router.js';
import Cast from './Cast';
import Reviews from './Reviews';
import styles from './MovieDetailsPage.module.css';
import Notification from '../../../Notification';

export default class MovieDetailsPage extends Component {
  state = {
    movie: null,
    error: null,
  };

  static propTypes = {};

  componentDidMount() {
    moviesApi
      .getMovieDetails(this.props.match.params.movieId)
      .then(fetchedMovie => this.setState({ movie: fetchedMovie }))
      .catch(error => this.setState({ error }));
  }

  componentWillUnmount() {
    this.setState({ error: false });
  }

  handleGoBack = () => {
    const { state } = this.props.location;
    const { history } = this.props;

    if (state && state.from) {
      history.push(state.from);
      return;
    }

    history.push(routes.home);
  };

  render() {
    const { movie } = this.state;
    const { state } = this.props.location;
    const { error } = this.state;
    let poster;
    if (movie) {
      movie.poster_path
        ? (poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
        : (poster = 'https://via.placeholder.com/500x750.png?text=NO+POSTER');
    }
    return (
      <>
        <button
          type="button"
          onClick={this.handleGoBack}
          className={styles.btn}
        >
          Go back
        </button>
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}
        {movie && (
          <div className={styles.card}>
            <img
              src={poster}
              alt="movie.original_title"
              className={styles.poster}
            />
            <div className={styles.desc}>
              <h2 className={styles.title}>{movie.original_title}</h2>
              <p className={styles.rating}>
                Rating: {movie.vote_average || 'no votes'}
              </p>
              <h3 className={styles.overview}>Overwiew</h3>
              <p className={styles.info}>
                {movie.overview ||
                  "We're sorry, this movie has no description :("}
              </p>
              <h4 className={styles.genre}>Genres</h4>
              <p>{movie.genres.map(genre => `${genre.name} `)}</p>
            </div>
          </div>
        )}
        <div className={styles.additionalInfo}>
          <h4>Additional Information</h4>
          <ul>
            <li className={styles.addListItem}>
              <Link
                className={styles.additionalLink}
                to={{
                  pathname: `${routes.movies}${this.props.match.params.movieId}/cast`,
                  state: {
                    from: state && state.from ? state.from : '',
                  },
                }}
              >
                Cast
              </Link>
            </li>
            <li className={styles.addListItem}>
              <Link
                className={styles.additionalLink}
                to={{
                  pathname: `${routes.movies}${this.props.match.params.movieId}/reviews`,
                  state: {
                    from: state && state.from ? state.from : '',
                  },
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path={routes.movieCast} component={Cast} />
          <Route path={routes.movieReviews} component={Reviews} />
        </Switch>
      </>
    );
  }
}