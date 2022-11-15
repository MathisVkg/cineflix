import { authenticationService } from "../jwt/_services/authentification.service";
import React from "react";
import GetUserType from "../components/Functions/Token/GetUserType";

function PrivateAdminRoute({ component }) {
  const accessLevel = GetUserType();
  const currentUser = authenticationService.currentUserValue;
  if (!currentUser) {
    window.location.assign("/auth");
  }
  if (component.type.name === "Dashboard" && accessLevel < 3) {
    window.location.assign("/");
  }
  return <div>{component}</div>;
}

export default PrivateAdminRoute;
