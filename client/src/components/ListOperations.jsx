import React, { useState } from "react";
import Search from "./Search";
import Content from "./Content";
import { Grid } from "@material-ui/core";
import MyProvider from "../application/provide";

export default function App() {
  const [state, setState] = useState({});

  return (
    <MyProvider.Provider value={{ state, setState }}>
      <Grid container spacing={3} direction="column">
        <Grid item container>
          <Grid item xs={false} sm={2} />

          <Search />
          <Grid item xs={false} sm={2} />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Content />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </MyProvider.Provider>
  );
}
