import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import illustrationHero from "../images/illustration-hero.svg";

const useStyles = makeStyles((theme) => ({
  illustrationHero: {
    width: "80%",
    zIndex: 1,
    margin: "0 auto",
    paddingTop: "5em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2em",
    },
  },
  illustrationHeroBackDiv: {
    width: "70%",
    height: "50%",
    backgroundColor: theme.palette.common.SoftBlue,
    position: "relative",
    top: "-50%",
    borderBottomLeftRadius: 250,
    marginLeft: "auto",
    zIndex: -1,
    [theme.breakpoints.down("md")]: {
      top: "-30%",
      height: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      top: "-30%",
      height: "40%",
    },
    [theme.breakpoints.down("xs")]: {
      top: "-50%",
      height: "50%",
    },
  },
  heroText: {
    padding: "5em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
      marginTop: "2em",
    },
  },
  chromeButton: {
    textTransform: "none",
    backgroundColor: theme.palette.common.SoftBlue,
    color: "black",
    "&:hover": {
      backgroundColor: theme.palette.primary,
      borderColor: theme.palette.common.SoftBlue,
      color: theme.palette.common.SoftBlue,
    },
  },
  firefoxButton: {
    textTransform: "none",
    "&:hover": {
      borderColor: "black",
    },
  },
  heroTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      textAlign: "center",
    },
  },
  heroSubtitle: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      maxWidth: "80%",
      margin: "1em auto",
      fontSize: ".75rem",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "90%",
    },
  },
}));
function HeroBlock() {
  const classes = useStyles();

  return (
    <Grid container wrap="wrap-reverse">
      {/* ---hero text--- */}
      <Grid item xs={12} sm={6} className={classes.heroText}>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="h3" paragraph className={classes.heroTitle}>
              Welcome to the Budget
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              className={classes.heroSubtitle}
            >
              {" "}
              A clean and simple interface to organize your favourite websites.
              Open a new browser tab and see your sites load instantly. Try it
              for free.{" "}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* ---image--- */}
      <Grid item container alignItems="flex-end" xs={12} sm={6}>
        <img
          src={illustrationHero}
          alt="illustration Hero"
          className={classes.illustrationHero}
        />
        <div className={classes.illustrationHeroBackDiv}></div>
      </Grid>
    </Grid>
  );
}

export default HeroBlock;
