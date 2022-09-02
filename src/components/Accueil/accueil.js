import React, { useEffect, useState } from "react";
import { movieDbService } from "../../jwt/_services/movieDb.service";
import { Col, Nav, NavItem, NavLink, Row } from "reactstrap";

function Accueil() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState({});
  //
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getLastestMovie();
  }, []);

  const getLastestMovie = () => {
    movieDbService.getLastestMovie().then((result) => {
      setPopularMovies(result);
      genererateRandomMovie(result.results);
    });
  };

  const genererateRandomMovie = (movies) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const movie = movies[randomNumber];

    const filterMovies = movies.filter((elem) => elem.id !== movie.id);
    setPopularMovies(filterMovies);
    setRandomMovie(movie);
  };

  return (
    <div className="background-app d-flex flex-column justify-content-center">
      <div className="random-card" style={{ backgroundImage: `url(${IMGPATH}${randomMovie?.backdrop_path})` }}>
        <Row className="justify-content-between align-items-center w-100">
          <Col sm="3" className="random-card-vote">
            <div className="mb-4">
              <p className="vote">{randomMovie.vote_count}</p>
              <p>Public vote</p>
            </div>
            <hr />
            <div>
              <p className="vote">{randomMovie.vote_average}</p>
              <p>Global Vote</p>
            </div>
          </Col>
          <Col sm="4" className="random-card-info">
            <div>
              <p className="title">{randomMovie.title}</p>
              <p className="overview">{randomMovie.overview}</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Nav>
          <NavItem className="movie-nav">
            <p>Movies</p>
          </NavItem>
          <NavItem className="movie-nav">
            <p>Series</p>
          </NavItem>
          <NavItem className="movie-nav">
            <p>Animes</p>
          </NavItem>
        </Nav>
      </div>
      <div className="movie-container">
        {popularMovies?.map(({ poster_path, vote_average, title }, index) => (
          <Col sm="auto" className="movie-card">
            <div className="movie-card-back" style={{ backgroundImage: `url(${IMGPATH}${poster_path})` }} />
            <div>
              <p className="title">{title}</p>
              <p
                className={`note ${
                  vote_average > 7 ? "movie-vote-green" : vote_average > 3 ? "movie-vote-orange" : "movie-vote-red"
                }`}
              >
                {vote_average}
              </p>
            </div>
          </Col>
        ))}
      </div>
    </div>
  );
}

export default Accueil;
