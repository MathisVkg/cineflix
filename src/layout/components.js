import { lazy } from "react";

const components = {
  Login: lazy(() => import("../components/Authentication/login")),
  Accueil: lazy(() => import("../components/Accueil/accueil")),
  Detail: lazy(() => import("../components/Detail/Detail")),
  Discover: lazy(() => import("../components/Discover/Discover")),
  Profile: lazy(() => import("../components/Profile/Profile"))
};

export default components;
