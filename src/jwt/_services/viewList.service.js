import { handleResponse } from "../_helpers";

export const viewListService = {
  getViewListUser,
  addViewList,
  removeViewList
};

function getViewListUser(utilisateurId, movieId) {
  // eslint-disable-next-line no-undef
  let url = `${process.env.REACT_APP_API}/viewList?UtilisateurId=${utilisateurId}`;
  if (movieId !== "") url += `&MovieId=${movieId}`;

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

function addViewList(json) {
  // eslint-disable-next-line no-undef
  const url = `${process.env.REACT_APP_API}/viewList`;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json)
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}

function removeViewList(json) {
  // eslint-disable-next-line no-undef
  const url = `${process.env.REACT_APP_API}/viewList`;

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json)
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}
