import React, { useEffect, useState } from "react";
import { movieDbService } from "../../jwt/_services/movieDb.service";

function Detail({ match }) {
  const [movieId, setMovieId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (match.params.movieId) {
      const movieId = parseInt(match.params.movieId, 10);
      setMovieId(movieId);
      getMovieDetail(movieId);
    }
  }, []);

  const getMovieDetail = (movieId) => {
    movieDbService.getMovieDetail(movieId).then(
      (result) => {
        console.log(result);
        setIsLoaded(true);
      },
      () => setIsLoaded(true)
    );
  };

  return <p>hey</p>;
}

export default Detail;
