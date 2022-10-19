import React, { useEffect, useState } from "react";
import { movieDbService } from "../../jwt/_services/movieDb.service";
import { useParams } from "react-router-dom";
import { aldebridService } from "../../jwt/_services/aldebrid.service";
import { Input } from "reactstrap";

function Detail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [debridedLink, setDebridedLink] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [linkMovieDl, setLinkMovieDl] = useState("");
  const [linkLoaded, setLinkLoaded] = useState(false);
  const [errorAldebrid, setErrorAldebrid] = useState(false);
  //
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetail(movieId);
    getSimilarMovies(movieId);
  }, []);

  const getMovieDetail = (movieId) => {
    movieDbService.getMovieDetail(movieId).then(
      (result) => {
        setIsLoaded(true);
        setMovie(result);
      },
      () => setIsLoaded(true)
    );
  };

  const getSimilarMovies = (movieId) => {
    movieDbService.getSimilarMovies(movieId).then((result) => {
      setSimilarMovies(result?.results);
    });
  };

  const debridLink = () => {
    aldebridService.debridLink(linkMovieDl).then(
      (result) => {
        if (result.status === "error") {
          setDebridedLink({});
          setErrorAldebrid(true);
        } else {
          setDebridedLink(result);
          setLinkLoaded(true);
          setErrorAldebrid(false);
        }
      },
      () => {
        setShowInput(false);
        setDebridedLink({});
        setErrorAldebrid(true);
      }
    );
  };

  const calculateTime = (movieTime) => {
    let timer = 0;
    if (movieTime > 60 && movieTime < 120) {
      timer = `1h${movieTime % 60 < 10 ? "0" : ""}${movieTime % 60}`;
    } else if (movieTime > 120) {
      timer = `2h${movieTime % 60 < 10 ? "0" : ""}${movieTime % 60}`;
    } else timer = movieTime;
    return timer;
  };

  const generateStar = (movieVote) => {
    if (movieVote === undefined) return;
    if (movieVote > 7) {
      return (
        <div className="d-flex align-items-center">
          <i className="mdi mdi-star" style={{ color: "#d99c22" }} />
          <i className="mdi mdi-star" style={{ color: "#d99c22" }} />
          <i className="mdi mdi-star" style={{ color: "#d99c22" }} />
          <i className="mdi mdi-star" style={{ color: "#d99c22" }} />
          <i className="mdi mdi-star" />
        </div>
      );
    } else if (movieVote > 3 && movieVote < 7) {
      return (
        <div className="d-flex align-items-center">
          <i className="mdi mdi-star" style={{ color: "#d99c22" }} />
          <i className="mdi mdi-star" style={{ color: "#d99c22" }} />
          <i className="mdi mdi-star" style={{ color: "#d99c22" }} />
          <i className="mdi mdi-star" />
          <i className="mdi mdi-star" />
        </div>
      );
    }
    return (
      <div className="d-flex align-items-center">
        <i className="mdi mdi-star" style={{ color: "#d99c22" }} />
        <i className="mdi mdi-star" style={{ color: "#d99c22" }} />
        <i className="mdi mdi-star" />
        <i className="mdi mdi-star" />
        <i className="mdi mdi-star" />
      </div>
    );
  };

  const movieRedirection = (id) => {
    window.location.assign(`/movie-detail/${id}`);
  };

  return (
    <div className="background-app">
      {isLoaded && (
        <div className="d-flex flex-column">
          <i
            className="mdi mdi-arrow-left back-button"
            onClick={() => {
              window.location.assign(`/accueil`);
            }}
          />
          <div
            className="movie-detail-poster position-relative"
            style={{ backgroundImage: `url(${IMGPATH}${movie?.backdrop_path})` }}
          >
            <span className="gradient" />
          </div>
          <div className="d-flex align-items-center movie-detail-info">
            <img className="poster" src={`${IMGPATH}${movie?.poster_path}`} alt={movie?.title} />
            <div className="d-flex flex-column ml-4">
              <p className="title">{movie?.title}</p>
              <div className="d-flex align-items-center">
                {movie?.genres?.map(({ name }, index) => (
                  <p key={index} className={index > 0 ? "genre ml-3" : "genre"}>
                    {name}
                  </p>
                ))}
              </div>
              <div className="d-flex timer">
                <i className="mdi mdi-timer" />
                <p className="ml-2">{calculateTime(movie?.runtime)}</p>
              </div>
              <div className="d-flex vote">
                {generateStar(movie?.vote_average)}
                <p className="ml-2">
                  {movie?.vote_average?.toFixed(1)} <span className="ml-3">({movie?.vote_count})</span>
                </p>
              </div>
            </div>
          </div>
          <div className="movie-detail-button">
            <i className="mdi mdi-plus mr-4" />
            {showInput ? (
              <div className="d-flex link-container position-relative">
                <Input
                  type="text"
                  name="linkMovie"
                  value={linkMovieDl}
                  onChange={(e) => setLinkMovieDl(e.target.value)}
                />
                <i
                  className="mdi mdi-check"
                  onClick={() => debridLink()}
                  style={{ borderRadius: "unset", borderRight: "1px solid #fff" }}
                />
                <i className="mdi mdi-close mr-4" onClick={() => setShowInput(false)} />
                {errorAldebrid && <p className="error">Une erreur est survenue !</p>}
              </div>
            ) : (
              !linkLoaded && (
                <i
                  className="mdi mdi-download mr-4"
                  onClick={() => {
                    window.open(`https://www.zone-telechargement.ink/?p=films&search=${movie?.title}`, "_blank");
                    setShowInput(true);
                    setLinkMovieDl("");
                  }}
                />
              )
            )}
            {linkLoaded && (
              <a href={debridedLink?.data?.link} download onClick={() => setLinkLoaded(false)}>
                <i className="mdi mdi-link-variant">
                  {debridedLink?.data?.link && (
                    <span className="ml-3 position-relative" style={{ bottom: "2px" }}>
                      {debridedLink?.data?.link}
                    </span>
                  )}
                </i>
              </a>
            )}
          </div>
          <div className="movie-detail-overview">
            <p className="title">Synopsis</p>
            <p className="overview" style={{ maxWidth: "1300px" }}>
              {movie?.overview}
            </p>
          </div>
          <div className="detail-movie-similar-container">
            {similarMovies?.map(
              ({ poster_path, title, id }, index) =>
                poster_path && (
                  <div key={index} onClick={() => movieRedirection(id)} className="detail-movie-similar">
                    <img src={`${IMGPATH}${poster_path}`} alt={title} />
                    <p>{title}</p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
