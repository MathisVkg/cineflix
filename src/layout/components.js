import { lazy } from "react";

const components = {
  Login: lazy(() => import("../components/Authentication/login")),
  Accueil: lazy(() => import("../components/Accueil/accueil")),
  Detail: lazy(() => import("../components/Detail/Detail"))
};

export default components;
