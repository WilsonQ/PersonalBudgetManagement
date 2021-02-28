import React, { useState, useEffect } from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";

import AppBar from "./AppBar";
import Drawer from "./Drawer";
import { Link, useLocation, useHistory } from "react-router-dom";

import { isAuthenticated, setIsAuth } from "../../service/auth/authentication";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(isAuthenticated());
  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLogin(isAuthenticated());
    console.log("renderizar");
    return () => {};
  }, [login, setLogin]);

  const handleLogout = () => {
    console.log("global", !login, isAuthenticated());
    setLogin(!login);
    console.log("que pasa men", login);
    setIsAuth(!login);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* condicionar appbar 
      cuando el usuario no esta logiado solo tiene que mostrar el appbar  con el title y los botones de login y Register
      si esta logeado tiene que mostra el drawer y un boton de logout */}

      <AppBar
        handleLogout={handleLogout}
        login={login}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      {login && <Drawer handleDrawerClose={handleDrawerClose} open={open} />}

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {React.Children.map(props.children, function (child) {
            return React.cloneElement(child);
          })}
        </Container>
      </main>
    </div>
  );
}
