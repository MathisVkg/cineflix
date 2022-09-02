import { BehaviorSubject } from "rxjs";
import { handleResponse } from "../_helpers";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("currentUser")));

export const authenticationService = {
  login,
  logout,
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(identite, motDePasse) {
  const url = `https://localhost:7126/authentification`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ identite, motDePasse })
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.removeItem("currentLock");
      localStorage.setItem("currentUser", JSON.stringify(user.token));
      currentUserSubject.next(user);
      return user;
    });
}

function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentLock");
  currentUserSubject.next(null);
  // window.location.reload();
}
