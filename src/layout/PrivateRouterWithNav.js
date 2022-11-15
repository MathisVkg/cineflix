import React from "react";
import { authenticationService } from "../jwt/_services/authentification.service";
import Navbar from "../Components/Nav/Navbar";

function PrivateRouterWithNav({ component }) {
  const currentUser = authenticationService.currentUserValue;
  if (!currentUser) {
    window.location.assign("/auth");
  }
  return (
    <div>
      <Navbar connected={currentUser} />
      {component}
    </div>
  );
}

export default PrivateRouterWithNav;
