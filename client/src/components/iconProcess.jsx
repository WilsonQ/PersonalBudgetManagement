import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration({
  success,
  loading,
  icon,
  handleFunction,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <IconButton
          color="primary"
          onClick={handleFunction}
          aria-label="directions"
        >
          {success ? <CheckIcon /> : <>{icon}</>}
        </IconButton>
        {loading && (
          <CircularProgress size={35} className={classes.fabProgress} />
        )}
      </div>
    </div>
  );
}
