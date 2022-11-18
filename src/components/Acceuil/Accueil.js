import React, { useEffect, useState } from "react";
import { themoviedbService } from "../../jwt/_services/themoviedb.service";
import { Link } from "react-router-dom";
import Loading from "../LoadingAnimation/Loading";

function Accueil() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(0);
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getPopularMovies();
    document.body.style.overflow = null;
  }, []);

  const getPopularMovies = () => {
    themoviedbService.getPopularMovies().then(
      (result) => {
        setPopularMovies(result.results);
        setIsLoaded(true);
      },
      () => setIsLoaded(true)
    );
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
        <h2>Popular Movies</h2>
        <div className="movies-container" id="movies-container">
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
            ))
          ) : (
            <div>
              <p>chargement</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Accueil;
