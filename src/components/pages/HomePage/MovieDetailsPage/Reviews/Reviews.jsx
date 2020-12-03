import React, { Component } from 'react';
import moviesApi from '../../../../services/movieApi.js';
import styles from './Reviews.module.css';
import Notification from '../../../../../components/Notification';

export default class Reviews extends Component {
  state = {
    reviews: null,
    error: null,
  };

  componentDidMount() {
    const id = this.props.match.params.movieId;
    moviesApi
      .getMovieReviews(id)
      .then(({ results }) => this.setState({ reviews: results }))
      .catch(error => this.setState({ error }));
  }

  componentWillUnmount() {
    this.setState({ error: false });
  }

  render() {
    const { reviews, error } = this.state;
    return (
      <>
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}
        <ul>
          {reviews &&
            reviews.length > 0 &&
            reviews.map(review => {
              return (
                <li key={review.id} className={styles.reviewItem}>
                  <p className={styles.reviewContentAuthor}>
                    Author: {review.author}
                  </p>
                  <p className={styles.reviewContent}>{review.content}</p>
                </li>
              );
            })}
          {reviews && !reviews.length && (
            <li>Unfortunately we don't have any reviews for this movie.</li>
          )}
        </ul>
      </>
    );
  }
}
