import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Select from "./SelectCategory";
import Grid from "@material-ui/core/Grid";
import TabCategories from "./TabCategories";

import { searchOperation } from "../service/api/apiBackend";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    margin: theme.spacing(1),

    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  let searchRef = useRef(null);

  const handleSearchOperations = async (e) => {
    e.preventDefault();
    console.table("new category", searchRef.current.children[0].value);
    let str = { str: searchRef.current.children[0].value };
    console.log("buscando...", str);
    let resp = await searchOperation(str);
    console.log("que retorna", resp);
    if (resp === 200) {
      searchRef.current.children[0].value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchOperations(e);
    }
  };
  return (
    <>
      <div className={classes.root}>
        <Grid direction="row" container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper component="form" className={classes.paper}>
              <InputBase
                ref={searchRef}
                className={classes.input}
                placeholder="Search Operation"
                inputProps={{ "aria-label": "search Operations" }}
                onKeyDown={handleKeyDown}
              />
              <IconButton
                onClick={handleSearchOperations}
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Select />
          </Grid>       */}
        </Grid>
      </div>
    </>
  );
}
