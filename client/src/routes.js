import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard as DashboardView } from "./views";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={DashboardView} />
      </Switch>
    </>
  );
};

export default Routes;
