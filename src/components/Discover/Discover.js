import React, { useEffect, useState } from "react";
import { themoviedbService } from "../../jwt/_services/themoviedb.service";
import { Link } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import Loading from "../LoadingAnimation/Loading";

function Discover() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [genreSelected, setGenreSelected] = useState(0);
  const [activeMovie, setActiveMovie] = useState(0);
  const [moviesDiscover, setMoviesDiscover] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showBackBtn, setShowBackBtn] = useState(false);
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getGenreMovies();
    document.body.style.overflow = null;
  }, []);

  useEffect(() => {
    getDiscoverMovies();
  }, [activePage, genreSelected]);

  window.onscroll = function () {
    if (window.scrollY > 150) setShowBackBtn(true);
    else setShowBackBtn(false);
  };

  const getGenreMovies = () => {
    themoviedbService.getGenreMovies().then((result) => {
      setGenres(result.genres);
    });
  };

  const getDiscoverMovies = () => {
    themoviedbService.getDiscoverMovies(activePage, genreSelected).then((result) => {
      setMoviesDiscover((prevState) => [...prevState, ...result.results]);
      setIsLoaded(true);
    });
  };

  const changeMovieGenre = (id) => {
    setGenreSelected(genreSelected === id ? 0 : id);
    setMoviesDiscover([]);
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
      <div className="discover-container">
        <i
          style={showBackBtn ? { opacity: "1" } : { opacity: "0", zIndex: "-10" }}
          className="fa-solid fa-arrow-up top-button"
          onClick={() => {
            window?.scrollTo(0, 0);
          }}
        />
        <div className="genre-container">
          {genres?.map(({ id, name }, index) => (
            <p
              className={genreSelected === id ? "active-link" : "link"}
              key={index}
              onClick={() => changeMovieGenre(id)}
            >
              {name}
            </p>
          ))}
        </div>
        <div className="movies-container flex-wrap justify-content-center" id="movies-container">
          {isLoaded ? (
            moviesDiscover?.map(({ id, poster_path, title, overview, vote_average, vote_count }, index) => (
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
              <Spinner>Loading...</Spinner>
            </div>
          )}
        </div>
        {isLoaded && (
          <div className="d-flex justify-content-center" style={{ marginBottom: "70px" }}>
            <Button className="loading-btn" onClick={() => setActivePage(activePage + 1)}>
              Load more
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Discover;
