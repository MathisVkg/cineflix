import React from "react";
import { Route, Routes } from "react-router-dom";
import WithNavbar from "./layout/WithNavbar";
import components from "./layout/component";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<WithNavbar component={components.Accueil} />} />
        <Route path="/discover" element={<WithNavbar component={components.Discover} />} />
        <Route path="/movie-detail/:movieId" element={<WithNavbar component={components.Detail} />} />
        <Route path="/auth" element={components.SignInAuth} />
      </Routes>
    </div>
  );
}

export default App;
