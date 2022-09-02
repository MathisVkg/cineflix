import React, { Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ClearCacheProvider } from "react-clear-cache";
import PrivateRoute from "./layout/PrivateRoute";

import { configureStore } from "./redux/store";
import { ContextProvider } from "./context/ContextProvider";
import { Provider } from "react-redux";

import { history } from "./jwt/_helpers";

import components from "./layout/components";
import fulllayout from "./layout/fulllayout";

function App() {
  return (
    <ClearCacheProvider auto>
      <ContextProvider>
        <Provider store={configureStore()}>
          <Router basename="/accueil" history={history}>
            <Suspense fallback={null}>
              <Switch>
                <Route path="/authentication/login" component={components.Login} />
                <PrivateRoute path="/" component={fulllayout} />
              </Switch>
            </Suspense>
          </Router>
        </Provider>
      </ContextProvider>
    </ClearCacheProvider>
  );
}

export default App;
