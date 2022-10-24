import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import components from "./components";

export default function fulllayout() {
  return (
    <div>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/profile" component={components.Profile} />
        </Switch>
      </Suspense>
    </div>
  );
}
