import React from "react";
import { authenticationService } from "../jwt/_services/authentification.service";
import Navbar from "../components/Nav/Navbar";

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
