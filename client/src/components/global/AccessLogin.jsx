import React from "react";
import Button from "@material-ui/core/Button";
import { Link, useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { logoutUser } from "../../service/auth/authentication";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Login({ login, setLogin }) {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    console.log("accessLogin", login);
    logoutUser();
    setLogin(!login);
  };

  return (
    <div className={classes.root}>
      {login ? (
        <Button
          color="inherit"
          variant="outlined"
          component={Link}
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <>
          <Button
            color="inherit"
            variant="outlined"
            component={Link}
            to="/login"
            disabled={location.pathname === "/login"}
          >
            Login
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            component={Link}
            to="/register"
            disabled={location.pathname === "/register"}
          >
            Register
          </Button>
        </>
      )}
    </div>
  );
}

export default Login;
