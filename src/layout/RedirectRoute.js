function RedirectRoute({ pathname }) {
  if (pathname === "/") {
    window.location.assign("/accueil");
  }
}

export default RedirectRoute;
