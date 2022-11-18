import { handleResponse } from "../_helpers";

export const themoviedbService = {
  getPopularMovies,
  getDiscoverMovies,
  getGenreMovies,
  getDetailMovie,
  getSimilarMovies,
  getUpcoming
};

function getPopularMovies() {
  // eslint-disable-next-line no-undef
  const url = ` https://api.themoviedb.org/3/movie/popular?api_key=${process.env?.REACT_APP_THEMOVIEDBKEY}&language=en-US&page=1`;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}

function getDiscoverMovies(activePage, genre) {
  // eslint-disable-next-line no-undef
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env?.REACT_APP_THEMOVIEDBKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${activePage}&with_watch_monetization_types=flatrate`;
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
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env?.REACT_APP_THEMOVIEDBKEY}&language=en-US`;
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

function getDetailMovie(movieId) {
  // eslint-disable-next-line no-undef
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env?.REACT_APP_THEMOVIEDBKEY}&language=en-US`;
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
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env?.REACT_APP_THEMOVIEDBKEY}&language=en-US&page=1`;
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

function getUpcoming() {
  // eslint-disable-next-line no-undef
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env?.REACT_APP_THEMOVIEDBKEY}&language=en-US&page=1`;
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
