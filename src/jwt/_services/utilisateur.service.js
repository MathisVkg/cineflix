import { handleResponse } from "../_helpers";

export const utilisateurService = {
  getUtilisateur,
  renameUtilisateur
};

function getUtilisateur(utilisateurId) {
  // eslint-disable-next-line no-undef
  const url = `${process.env.REACT_APP_API}/utilisateur?UtilisateurId=${utilisateurId}`;

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

function renameUtilisateur(json) {
  // eslint-disable-next-line no-undef
  const url = `${process.env.REACT_APP_API}/utilisateur`;

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json)
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((reponse) => {
      return reponse;
    });
}
