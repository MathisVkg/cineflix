import React from "react";
import Navbar from "../Components/Nav/Navbar";
import { authenticationService } from "../jwt/_services/authentification.service";

function WithNavbar({ component }) {
  const currentUser = authenticationService.currentUserValue;
  return (
    <div>
      <header>
        <Navbar connected={currentUser} />
      </header>
      {component}
    </div>
  );
}

export default WithNavbar;
