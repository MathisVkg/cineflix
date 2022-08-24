import { authenticationService } from "../_services/authentification.service";

/**
 * Retourne toutes les requêtes sur l'API avec le Bearer Token de l'utilisateur.
 */
export function authHeader(json = false, file = false, custom = false, excel = false, zip = false) {
  const currentUser = authenticationService.currentUserValue;

  // Si l'utilisateur est stocké dans le navigateur et que celui-ci possède le token, on envoie le token.
  if (currentUser?.token) {
    if (json) return { Authorization: `Bearer ${currentUser.token}`, "Content-Type": "application/json" };
    if (file) return { Authorization: `Bearer ${currentUser.token}`, "Content-Type": "multipart/form-data" };
    if (custom) return { Authorization: `Bearer ${currentUser.token}` };
    if (excel)
      return {
        Authorization: `Bearer ${currentUser.token}`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      };

    if (zip)
      return {
        Authorization: `Bearer ${currentUser.token}`,
        "Content-Type": "application/zip"
      };

    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
}
