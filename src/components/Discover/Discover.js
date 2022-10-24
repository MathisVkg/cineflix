import React, { useEffect, useState } from "react";
import { movieDbService } from "../../jwt/_services/movieDb.service";
import Navbar from "../Navbar/Navbar";
import { Button, Col } from "reactstrap";
import { Link } from "react-router-dom";

function Discover() {
  const [moviesList, setMoviesList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [showGenre, setShowGenre] = useState(false);
  const [showArrowBtn, setShowArrowBtn] = useState(false);
  //
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getDiscoverMovies();
  }, [activePage, genreSelected]);

  useEffect(() => {
    getGenreMovies();
  }, []);

  window.onscroll = function () {
    if (window.scrollY > 150) setShowArrowBtn(true);
    else setShowArrowBtn(false);
  };

  const getDiscoverMovies = () => {
    movieDbService.getDiscoverMovies(genreSelected, activePage).then(
      (result) => {
        setMoviesList((prevState) => [...prevState, ...result.results]);
        setIsLoaded(true);
      },
      () => setIsLoaded(true)
    );
  };

  const getGenreMovies = () => {
    movieDbService.getGenreMovies().then((result) => {
      setGenres(result.genres);
    });
  };

  return (
    <div>
      {isLoaded && (
        <>
          <Navbar />
          <i
            style={showArrowBtn ? { opacity: "1" } : { opacity: "0", zIndex: "-10" }}
            className="mdi mdi-arrow-up top-button"
            onClick={() => {
              window?.scrollTo(0, 0);
            }}
          />
          <div className="top-container-discover">
            <p className="title" onClick={() => setShowGenre(true)}>
              MOVIE GENRE: {genres?.find((elem) => elem.id === genreSelected)?.name}
            </p>
            <div
              className="genre-container-list"
              style={showGenre ? { opacity: "1" } : { opacity: "0", zIndex: "-10" }}
            >
              <i className="mdi mdi-close" onClick={() => setShowGenre(false)} />
              {genres?.map(({ id, name }, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setGenreSelected(id === genreSelected ? 0 : id);
                    setShowGenre(false);
                    setMoviesList([]);
                  }}
                >
                  {name}
                </p>
              ))}
            </div>
          </div>
          <div className="movie-container" style={{ margin: "0 35px 35px 35px" }}>
            {moviesList?.map(({ poster_path, vote_average, title, id }, index) => (
              <Col key={index} sm="auto" className="movie-card">
                <Link to={`/movie-detail/${id}`}>
                  <img src={`${IMGPATH}${poster_path}`} alt={title} className="movie-card-back" />
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="title">{title}</p>
                    <p
                      className={`note ${
                        vote_average > 7
                          ? "movie-vote-green"
                          : vote_average > 3
                          ? "movie-vote-orange"
                          : "movie-vote-red"
                      }`}
                    >
                      {vote_average?.toFixed(1)}
                    </p>
                  </div>
                </Link>
              </Col>
            ))}
          </div>
          <div className="d-flex justify-content-center" style={{ marginBottom: "70px" }}>
            <Button className="loading-btn" onClick={() => setActivePage(activePage + 1)}>
              Load more
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Discover;
