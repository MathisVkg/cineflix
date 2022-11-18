import React, { useEffect, useState } from "react";
import { themoviedbService } from "../../jwt/_services/themoviedb.service";
import { Link } from "react-router-dom";
import Loading from "../LoadingAnimation/Loading";
import { Spinner } from "reactstrap";

function Accueil() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState({});
  const [activeMovie, setActiveMovie] = useState(0);
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getPopularMovies();
    getUpcoming();
    document.body.style.overflow = null;
  }, []);

  const getPopularMovies = () => {
    themoviedbService.getPopularMovies().then(
      (result) => {
        const randomNumber = Math.floor(Math.random() * 20);
        const movieSelected = result.results[randomNumber];
        setMovieSelected(movieSelected);
        setPopularMovies(result.results.filter((elem) => elem?.id !== movieSelected?.id));
        setIsLoaded(true);
      },
      () => setIsLoaded(true)
    );
  };

  const getUpcoming = () => {
    themoviedbService.getUpcoming().then((result) => {
      setUpComingMovies(result.results.filter((elem) => elem?.id !== movieSelected?.id));
    });
  };

  const changeMovieView = (id) => {
    if (activeMovie !== id) {
      setActiveMovie(id);
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <Loading />
      <div className="accueil-container">
        <div className="selected-movie" onClick={() => window.location.assign(`/movie-detail/${movieSelected?.id}`)}>
          <div className="backdrop-img" style={{ backgroundImage: `url(${IMGPATH}${movieSelected?.backdrop_path})` }} />
          <div className="info">
            <img src={`${IMGPATH}${movieSelected?.poster_path}`} alt={movieSelected?.title} />
            <div>
              <p className="title">{movieSelected?.title}</p>
              <div className="d-flex align-items-center mt-4">
                <p
                  className={`vote-average ${
                    movieSelected?.vote_average > 3 ? (movieSelected?.vote_average > 7 ? "green" : "orange") : "red"
                  }`}
                >
                  {movieSelected?.vote_average?.toFixed(1)}
                </p>
                <p className="vote-count">({movieSelected?.vote_count})</p>
              </div>
            </div>
          </div>
        </div>
        <div className="up-coming-container">
          <h2>Up coming movies</h2>
          <div className="movies-container" style={{ overflowX: "scroll" }}>
            {upComingMovies?.map(({ id, poster_path, title, overview, vote_average, vote_count }, index) => (
              <div
                className={`${
                  activeMovie === id && activeMovie !== 0
                    ? "active-card animate__animated animate__fadeIn"
                    : "movie-card"
                }`}
                key={index}
                onClick={() => changeMovieView(id)}
              >
                {activeMovie === id && (
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => {
                      setActiveMovie(0);
                      document.body.style.overflow = null;
                    }}
                  />
                )}
                <img src={`${IMGPATH}${poster_path}`} alt={title} />
                {activeMovie === id && (
                  <div className="right-container">
                    <p className="title">{title}</p>
                    <p className="overview">{overview}</p>
                    <div className="d-flex align-items-center mt-4">
                      <p
                        className={`vote-average ${vote_average > 3 ? (vote_average > 7 ? "green" : "orange") : "red"}`}
                      >
                        {vote_average?.toFixed(1)}
                      </p>
                      <p className="vote-count">({vote_count})</p>
                    </div>
                    <Link to={`/movie-detail/${id}`}>
                      <span>Get more detail</span> <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bottom-container">
          <h2>Popular Movies</h2>
          <div className="movies-container flex-wrap justify-content-center">
            {isLoaded ? (
              popularMovies?.map(({ id, poster_path, title, overview, vote_average, vote_count }, index) => (
                <div
                  className={`${
                    activeMovie === id && activeMovie !== 0
                      ? "active-card animate__animated animate__fadeIn"
                      : "movie-card"
                  }`}
                  key={index}
                  onClick={() => changeMovieView(id)}
                >
                  {activeMovie === id && (
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => {
                        setActiveMovie(0);
                        document.body.style.overflow = null;
                      }}
                    />
                  )}
                  <img src={`${IMGPATH}${poster_path}`} alt={title} />
                  {activeMovie === id && (
                    <div className="right-container">
                      <p className="title">{title}</p>
                      <p className="overview">{overview}</p>
                      <div className="d-flex align-items-center mt-4">
                        <p
                          className={`vote-average ${
                            vote_average > 3 ? (vote_average > 7 ? "green" : "orange") : "red"
                          }`}
                        >
                          {vote_average?.toFixed(1)}
                        </p>
                        <p className="vote-count">({vote_count})</p>
                      </div>
                      <Link to={`/movie-detail/${id}`}>
                        <span>Get more detail</span> <i className="fa-solid fa-arrow-right" />
                      </Link>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>
                <Spinner>Loading...</Spinner>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Accueil;
