import axios from 'axios';

class MovieService {
  _baseURL = 'https://api.themoviedb.org/3/';
  _key = '2d536748299a0654176fee96f4763797';

  getTrending = () => {
    return this.get('trending/movie/day?');
  };

  searchMovies = (query = '', page = 1) => {
    return this.get(`search/movie?query=${query}&page=${page}`);
  };

  getMovieDetails = id => {
    return this.get(`movie/${id}?`);
  };

  getMovieCredits = id => {
    return this.get(`movie/${id}/credits?`);
  };

  getMovieReviews = id => {
    return this.get(`movie/${id}/reviews?`);
  };

  get = (url = '') => {
    return axios
      .get(`${this._baseURL}${url}&api_key=${this._key}`)
      .then(res => res.data);
  };
}

const movieService = new MovieService();

export default movieService;
