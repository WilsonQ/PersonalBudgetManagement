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
import PublicRoute from "./public.routes";
import PrivateRoute from "./private.routes";
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: { name: "wilson", surname: "quispe" },
  token: null,
};
//? El reducer - Para que sirve averiguar
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
const Routes = () => {
  const browserHistory = createBrowserHistory();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || null);
    const token = JSON.parse(localStorage.getItem("token") || null);
    console.log("-----> user", user);
    console.log("-----> token", token);

    ///? Si existen el usuario o el token realiza un LOGIN
    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token,
        },
      });
    }
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
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
      </AuthContext.Provider>
    </>
  );
};

export default Routes;
