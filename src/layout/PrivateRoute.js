import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authenticationService } from "../jwt/_services/authentification.service";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        return (
          <Redirect
            to={{
              pathname: "/accueil",
              state: { from: props.location }
            }}
          />
        );
      }

      if (props.location.pathname === "/") {
        return (
          <Redirect
            to={{
              pathname: "/accueil",
              state: { from: props.location }
            }}
          />
        );
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
