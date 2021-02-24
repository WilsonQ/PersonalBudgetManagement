import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Dashboard from "../views/Dashboard/dashboardView";
import Global from "../components/global/global";
import NewOperation from "../views/Operation/NewOperationView.js";
import Operation from "../views/Operation/OperationsView.js";
import Login from "../views/Login/LoginView.js";
import Register from "../views/Login/RegisterView.js";
import LandingPage from "../views/LandingPage";
import Profile from "../views/Profile/profileView";
//import { PublicRoute, PrivateRoute } from "./helperRoutes";
import PublicRoute from "./public.routes";
import PrivateRoute from "./private.routes";
const Routes = () => {
  const browserHistory = createBrowserHistory();
  return (
    <>
      <Router history={browserHistory}>
        <Global>
          <Switch>
            <PrivateRoute path="/operations" component={Operation} />
            <PrivateRoute path="/operation/new" component={NewOperation} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />
            <PublicRoute path="/Register" component={Register} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute exact path="/" component={LandingPage} />
            <Route exact path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </Global>
      </Router>
    </>
  );
};

export default Routes;
