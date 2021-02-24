import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Dashboard from "./views/Dashboard/dashboardView";
import Global from "./components/global/global";
import NewOperation from "./views/Operation/NewOperationView";
import Operation from "./views/Operation/OperationsView";

const Routes = () => {
  const browserHistory = createBrowserHistory();
  return (
    <>
      <Router history={browserHistory}>
        <Global>
          <Switch>
            <Route path="/operations" children={<Operation />} />
            <Route path="/operation/new" children={<NewOperation />} />
            <Route exact path="/" children={<Dashboard />} />
          </Switch>
        </Global>
      </Router>
    </>
  );
};

export default Routes;
