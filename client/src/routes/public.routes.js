import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../service/auth/authentication";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

export default PublicRoute;
