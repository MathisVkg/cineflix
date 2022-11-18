import React, { useEffect } from "react";

function Loading() {
  useEffect(() => {
    const divElem = document.getElementById("loading-container");
    setTimeout(() => {
      divElem.style.opacity = "0";
      divElem.addEventListener("transitionend", () => (divElem.style.display = "none"));
    }, 2000);
  }, []);

  return (
    <div className="loading-container" id="loading-container">
      <div className="loading-block">
        <span />
        <span />
        <span />
        <span />
        <h2>C</h2>
      </div>
    </div>
  );
}

export default Loading;
