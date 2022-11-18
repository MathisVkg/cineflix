import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../LoadingAnimation/Loading";
import { themoviedbService } from "../../jwt/_services/themoviedb.service";
import { Spinner } from "reactstrap";

function DetailMovie() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const { movieId } = useParams();
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getDetailMovie();
    getSimilarMovies();
    document.body.style.overflow = null;
  }, []);

  const getDetailMovie = () => {
    themoviedbService.getDetailMovie(movieId).then(
      (result) => {
        setMovieDetail(result);
        setIsLoaded(true);
      },
      () => setIsLoaded(true)
    );
  };

  const getSimilarMovies = () => {
    themoviedbService.getSimilarMovies(movieId).then((result) => {
      setSimilarMovies(result.results);
    });
  };

  return (
    <>
      <Loading />
      <div className="movie-detail-container">
        {isLoaded ? (
          <>
            <div className="left-container position-relative">
              <img src={`${IMGPATH}${movieDetail?.poster_path}`} alt={movieDetail?.title} />
              <span />
            </div>
            <div className="right-container">
              <h2 className="title">{movieDetail?.title}</h2>
              <a
                className="thriller"
                href={`https://www.youtube.com/results?search_query=${movieDetail?.title}`}
                target="_blank"
                rel="noreferrer"
              >
                See thriller
              </a>
              <p className="overview">{movieDetail?.overview}</p>
              <div className="d-flex align-items-center mt-4">
                <p
                  className={`vote-average ${
                    movieDetail.vote_average > 3 ? (movieDetail?.vote_average > 7 ? "green" : "orange") : "red"
                  }`}
                >
                  {movieDetail?.vote_average?.toFixed(1)}
                </p>
                <p className="vote-count">({movieDetail?.vote_count})</p>
              </div>
              <h3 className="mt-4" style={{ opacity: "0.8" }}>
                Recommendations
              </h3>
              <div className="similar-movies">
                {similarMovies?.map(({ title, poster_path, id }, index) => (
                  <a href={`/movie-detail/${id}`} key={index}>
                    <div className="movie-card">
                      <img src={`${IMGPATH}${poster_path}`} alt={title} />
                      <p>{title}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <Spinner>Loading...</Spinner>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailMovie;
