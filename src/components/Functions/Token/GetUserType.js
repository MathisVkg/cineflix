export default function GetUserType() {
  const currentToken = localStorage.getItem("currentUser");
  if (currentToken === undefined || currentToken === null) return;

  const base64Url = currentToken.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return parseInt(JSON.parse(jsonPayload).NiveauAcces, 10);
}
