import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import GetUserType from "../Functions/Token/GetUserType";

function Navbar() {
  const [openNavMenu, setSetOpenNavMenu] = useState(false);
  const userType = GetUserType();
  console.log(userType);

  return (
    <div className="navbar-container">
      <nav>
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo">
            <i className="fa-solid fa-torii-gate" />
          </Link>
          <i className="fa-solid fa-arrow-left" onClick={() => setSetOpenNavMenu(true)} />
        </div>
        <div className={`hidden-container ${openNavMenu && "active"}`}>
          <div className="d-flex flex-column link-container">
            <i className="fa-solid fa-arrow-right" onClick={() => setSetOpenNavMenu(false)} />
            <Link
              to="discover"
              className={openNavMenu && "animate__animated animate__fadeInUp"}
              onClick={() => setSetOpenNavMenu(false)}
            >
              Discover
            </Link>
            <Link
              to="profile"
              className={openNavMenu && "animate__animated animate__fadeInUp"}
              onClick={() => setSetOpenNavMenu(false)}
            >
              Profile
            </Link>
          </div>
          <Button onClick={() => window.location.assign("auth")}>Sign in</Button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
