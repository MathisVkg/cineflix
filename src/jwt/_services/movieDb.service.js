import { authHeader, handleResponse } from "../_helpers";

const apiKey = "ec49e277da2875a3e7b4b443bb5f1975";
export const movieDbService = {
  getLastestMovie
};

function getLastestMovie() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  console.log(url);
  const requestOptions = {
    method: "GET",
    headers: authHeader(true)
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}
