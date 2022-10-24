import React, { useEffect, useState } from "react";
import { movieDbService } from "../../jwt/_services/movieDb.service";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import NavBar from "../Navbar/Navbar";

function Accueil() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState({});
  const [showArrowBtn, setShowArrowBtn] = useState(false);
  //
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getLastestMovie();
  }, []);

  window.onscroll = function () {
    if (window.scrollY > 150) setShowArrowBtn(true);
    else setShowArrowBtn(false);
  };

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
    <>
      <NavBar />
      <i
        style={showArrowBtn ? { opacity: "1" } : { opacity: "0", zIndex: "-10" }}
        className="mdi mdi-arrow-up top-button"
        onClick={() => {
          window?.scrollTo(0, 0);
        }}
      />
      <div className="background-app d-flex flex-column justify-content-center">
        <Link
          to={`/movie-detail/${randomMovie?.id}`}
          className="random-card"
          style={{ backgroundImage: `url(${IMGPATH}${randomMovie?.backdrop_path})` }}
        >
          <span className="gradient" />
          <Row className="justify-content-between align-items-center w-100 info-container">
            <Col sm="3" className="random-card-vote">
              <div className="mb-4">
                <p className="vote">{randomMovie?.vote_count}</p>
                <p>Public vote</p>
              </div>
              <hr />
              <div>
                <p className="vote">{randomMovie?.vote_average}</p>
                <p>Global Vote</p>
              </div>
            </Col>
            <Col sm="4" className="random-card-info">
              <div>
                <p className="title">{randomMovie?.title}</p>
                <p className="overview">{randomMovie?.overview}</p>
              </div>
            </Col>
          </Row>
        </Link>
        <div className="movie-container">
          <Col sm="4" className="movie-text">
            <p className="title">
              Popular Movies <hr />
            </p>
            <p className="extra">Exciting, emotional and unexpected.</p>
          </Col>
          {popularMovies?.map(({ poster_path, vote_average, title, id }, index) => (
            <Col key={index} sm="auto" className="movie-card">
              <Link to={`/movie-detail/${id}`}>
                <img src={`${IMGPATH}${poster_path}`} alt={title} className="movie-card-back" />
                <div className="d-flex align-items-center justify-content-between">
                  <p className="title">{title}</p>
                  <p
                    className={`note ${
                      vote_average > 7 ? "movie-vote-green" : vote_average > 3 ? "movie-vote-orange" : "movie-vote-red"
                    }`}
                  >
                    {vote_average}
                  </p>
                </div>
              </Link>
            </Col>
          ))}
        </div>
      </div>{" "}
    </>
  );
}

export default Accueil;
