import { handleResponse } from "../_helpers";

const apiKey = "RJTz57QQlpH9YNYfBWwl&link";
export const aldebridService = {
  debridLink
};

function debridLink(link) {
  const url = `https://api.alldebrid.com/v4/link/unlock?agent=cineflix&apikey=${apiKey}&link=${link}`;
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
