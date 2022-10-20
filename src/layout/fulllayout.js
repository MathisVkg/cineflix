import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import components from "./components";

export default function fulllayout() {
  return (
    <div>
      <Suspense fallback={null}>
        <Switch>
          {/* <Route path="/accueil" component={components.Accueil} />*/}
          {/* <Route path="/movie-detail/:movieId" component={components.Detail} />*/}
        </Switch>
      </Suspense>
    </div>
  );
}
