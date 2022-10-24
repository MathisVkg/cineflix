import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { movieDbService } from "../../jwt/_services/movieDb.service";

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const searchMovie = (e) => {
    e.preventDefault();
    const movieString = e.target?.search.value;
    if (movieString !== "") {
      movieDbService.searchMovie(movieString).then((result) => {
        console.log(result);
      });
    }
  };

  const disconnect = () => {
    localStorage.clear();
    const url = window.location.href;
    if (url.includes("profile")) window.location.assign("/accueil");
    else window.location.reload();
  };

  return (
    <div className="navbar-app" onClick={() => showDropdown && setShowDropdown(false)}>
      <div className="d-flex align-items-center left">
        <Link to="/accueil">
          <i className="mdi mdi-chart-arc" />
        </Link>
      </div>
      <div className="d-flex align-items-center right">
        <Link to="/discover" className="mr-4">
          Discover
        </Link>
        <p className="position-relative" onClick={() => setShowDropdown(!showDropdown)}>
          Profile <i className={showDropdown ? "mdi mdi-chevron-down" : "mdi mdi-chevron-up"} />
          <div
            className="dropdown-nav"
            style={showDropdown ? { opacity: "1", zIndex: "100" } : { opacity: "0", zIndex: "-10" }}
          >
            <Link to="/profile">Account</Link>
            <p onClick={() => disconnect()}>Disconnect</p>
          </div>
        </p>
        <form onSubmit={(e) => searchMovie(e)} className="d-flex align-items-center search ml-4">
          <Input type="text" name="search" />
          <Button type="submit" className="loop" style={{ borderRadius: "0 4px 4px 0" }}>
            <i className="mdi mdi-magnify" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NavBar;
