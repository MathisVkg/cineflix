import { handleResponse } from "../_helpers";

export const aldebridService = {
  debridLink
};

function debridLink(link) {
  // eslint-disable-next-line no-undef
  const url = `https://api.alldebrid.com/v4/link/unlock?agent=cineflix&apikey=${process.env.REACT_APP_APIALDEBRID}&link=${link}`;
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
