import { authenticationService } from "../_services/authentification.service";

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      handleStatusCode(response);
      return Promise.reject(data);
    }

    return data;
  });
}

export function handleBlobResponse(response) {
  return response.blob().then((blob) => {
    const data = blob;

    if (!response.ok) {
      handleStatusCode();
      return Promise.reject(blob);
    }

    return data;
  });
}

function handleStatusCode(response) {
  if ([498].indexOf(response.status) !== -1) {
    authenticationService.lockscreen();
  }

  if ([401].indexOf(response.status) !== -1) {
    authenticationService.logout();
  }

  if ([403].indexOf(response.status) !== -1) {
    authenticationService.logout();
  }
}
