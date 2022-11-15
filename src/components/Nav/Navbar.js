import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav>
        <Link to="/" className="logo">
          <i className="fa-solid fa-torii-gate" />
        </Link>
        <div className="right-container">
          <Link to="/discover" className={window.location.pathname === "discover" ? "active-link" : "link"}>
            Discover
          </Link>
          <Link to="/profile" className={window.location.pathname === "profile" ? "active-link" : "link"}>
            Profile
          </Link>
          <button className="connexion-btn">Sign in</button>
        </div>
        {/* <i className="fa-solid fa-bars" />*/}
      </nav>
    </div>
  );
}

export default Navbar;
