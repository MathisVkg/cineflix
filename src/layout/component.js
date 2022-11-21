import React from "react";
import Accueil from "../components/Acceuil/Accueil";
import Discover from "../components/Discover/Discover";
import DetailMovie from "../components/DetailMovie/DetailMovie";
import SignInAuth from "../components/Auth/SignInAuth";

const components = {
  Accueil: <Accueil />,
  Discover: <Discover />,
  Detail: <DetailMovie />,
  SignInAuth: <SignInAuth />
};

export default components;
