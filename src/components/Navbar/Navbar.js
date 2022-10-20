import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import { movieDbService } from "../../jwt/_services/movieDb.service";

function NavBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const searchMovie = (e) => {
    e.preventDefault();
    const movieString = e.target.search.value;
    movieDbService.searchMovie(movieString).then((result) => {
      console.log(result);
    });
  };

  return (
    <div className="navbar-app">
      <div className="d-flex align-items-center left">
        <i className="mdi mdi-chart-arc" />
        <Link to="/accueil">Cineflix</Link>
      </div>
      <div className="d-flex align-items-center right">
        <Link to="/discover">
          <i className="mdi mdi-view-headline position-relative" style={{ top: "2px", margin: "0" }} /> Discover
        </Link>
        <Link to="/account">
          <i className="mdi mdi-account position-relative" style={{ top: "2px", margin: "0" }} /> Account
        </Link>
        <div className="d-flex align-items-center search">
          <i className="mdi mdi-magnify" onClick={() => setShowSearchBar(!showSearchBar)} />
          <div style={showSearchBar ? { width: "350px" } : { width: "0" }}>
            <form onSubmit={(e) => searchMovie(e)}>
              <Input type="text" name="search" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
