import React, { useEffect, useState } from "react";
import { movieDbService } from "../../jwt/_services/movieDb.service";
import { Col, Row } from "reactstrap";

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
      <Row className="m-5">
        <Col sm="12" className="random-card-card">
          <Row>
            <Col sm="auto">
              <div
                className="movie-card-random"
                style={{ backgroundImage: `url(${IMGPATH}${randomMovie?.poster_path})` }}
              />
            </Col>
            <Col sm="auto">
              <p>{randomMovie?.title}</p>
              <Row>
                <Col sm="auto" style={{ width: "25px" }}>
                  <p style={{ color: "#E5383B" }}>{randomMovie?.vote_average}</p>
                </Col>
                <Col sm="auto" style={{ width: "25px" }}>
                  <p>{randomMovie?.vote_count}</p>
                </Col>
              </Row>
              <p className="mt-3" style={{ maxWidth: "1000px" }}>
                {randomMovie?.overview}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="m-5">
        <Col sm="12">
          <Row className="justify-content-center">
            {popularMovies?.map(({ poster_path, id, title, vote_average, vote_count }, index) => (
              <div
                key={index}
                className="movie-card d-flex flex-column justify-content-end"
                style={{ backgroundImage: `url(${IMGPATH}${poster_path})` }}
              >
                <div className="movie-card-hover" style={{ minWidth: "100px" }}>
                  <p className="movie-card-title">
                    <p
                      className={`movie-card-vote ${
                        vote_average < 3
                          ? "movie-vote-red"
                          : vote_average > 3 && vote_average < 7
                          ? "movie-vote-orange"
                          : "movie-vote-green"
                      }`}
                    >
                      {vote_average}{" "}
                      <span style={{ color: "#fff", fontSize: "0.9em", fontWeight: "400" }}>({vote_count})</span>
                    </p>
                    {title}
                  </p>
                </div>
              </div>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Accueil;
