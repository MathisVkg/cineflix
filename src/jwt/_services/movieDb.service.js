import { handleResponse } from "../_helpers";

export const movieDbService = {
  getLastestMovie,
  getMovieDetail,
  getSimilarMovies,
  searchMovie,
  getDiscoverMovies,
  getGenreMovies
};

function getLastestMovie() {
  // eslint-disable-next-line no-undef
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_APIMOVIEDB}&language=en-US&page=1`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}

function getMovieDetail(movieId) {
  // eslint-disable-next-line no-undef
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_APIMOVIEDB}&language=en-US`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}

function getSimilarMovies(movieId) {
  // eslint-disable-next-line no-undef
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_APIMOVIEDB}&language=en-US&language=en-US&page=1`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}

function searchMovie(movieString) {
  // eslint-disable-next-line no-undef
  const url = `https://api.themoviedb.org/3/search/company?api_key=${process.env.REACT_APP_APIMOVIEDB}&query=${movieString}&page=1`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}

function getDiscoverMovies(genre, activePage) {
  // eslint-disable-next-line no-undef
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_APIMOVIEDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${activePage}&with_watch_monetization_types=flatrate`;
  if (genre !== 0) url += `&with_genres=${genre}`;

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}

function getGenreMovies() {
  // eslint-disable-next-line no-undef
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_APIMOVIEDB}&language=en-US`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}
