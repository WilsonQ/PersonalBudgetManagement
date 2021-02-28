import React, { useContext } from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

import orange from "@material-ui/core/colors/orange";
import AppContext from "../application/provide";

const primary = orange[500];
const accent = green[500];
const theme = createMuiTheme({
  palette: {
    primary: { main: accent }, // Purple and green play nicely together.
    secondary: { main: primary }, // This is just green.A700 as hex.
  },
});

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState("all");
  const valor = useContext(AppContext);

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(
      "🚀 ~ file: SelectCategory.jsx ~ line 29 ~ handleChange ~ event.target.value",
      event.target.value
    );

    valor.setState({ type: event.target.value });

    console.log(valor.state.type);
    //setState({ type: event.target.value });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <FormControl component="fieldset">
        <FormLabel style={{ color: "grey" }} component="legend">
          Type
        </FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio color="default" />}
            label="All"
          />
          <FormControlLabel
            value="ingreso"
            control={<Radio color="primary" />}
            label="Ingreso"
          />
          <FormControlLabel
            value="egreso"
            control={<Radio color="secondary" />}
            label="Egreso"
          />
        </RadioGroup>
      </FormControl>
    </MuiThemeProvider>
  );
}
