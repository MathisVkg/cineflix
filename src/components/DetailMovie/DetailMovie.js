import React from "react";
import { useParams } from "react-router-dom";

function DetailMovie() {
  const { movieId } = useParams();

  return (
    <div>
      <p>detail {movieId}</p>
    </div>
  );
}

export default DetailMovie;
