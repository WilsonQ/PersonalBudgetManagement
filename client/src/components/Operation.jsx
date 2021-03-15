import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import moment from "moment";

import { useForm } from "react-hook-form";

import MuiAutoComplete from "./muiAutoComplete";

import { createOperation } from "../service/api/apiBackend";

const currencies = [
  {
    value: "income",
    label: "Income",
  },
  {
    value: "expenses",
    label: "Expenses",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));
export default function LayoutTextFields() {
  const classes = useStyles();
  const autoC = useRef(null);
  const { register, errors, handleSubmit, control } = useForm();
  const [value, setValue] = useState(null);
  const [categories, setCategories] = React.useState([]);

  const [dataSubmit, setDataSubmit] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [dateToday, setDateToday] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const onSubmit = (data, e) => {
    data.category = categories;

    console.log(data, dataSubmit);
    e.target.reset();
    createOperation(data);
    //clear AutoComplete
    const ele = autoC.current.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    if (ele) ele.click();
    setCategory([]);
  };
  function handleChangeSubmit(event, data) {
    setDataSubmit({ ...dataSubmit, [event.target.name]: event.target.value });
  }

  const setCategory = () => {};

  return (
    <div className={classes.root}>
      <div>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            error={errors.concept !== undefined}
            onChange={handleChangeSubmit}
            inputRef={register({
              required: "You must provide a concept.",
              pattern: {
                value: /^[a-z  A-Z\u0590-\u05fe]*$/,
                message: "Your name should contain only letters!",
              },
              maxLength: {
                value: 20,
                message: "Your concept must be Less than 12 characters",
              },
            })}
            id="concept"
            name="concept"
            label="Concept"
            style={{ margin: 8 }}
            placeholder="You must provide Concent."
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            helperText={
              errors.concept !== undefined ? errors.concept.message : ""
            }
          />
          <TextField
            error={errors.amount !== undefined}
            onChange={handleChangeSubmit}
            inputRef={register({
              required: "You must provide a amount.",
              pattern: {
                value: /^0|[1-9]\d*$/,
                message: "Your name should contain only Number!",
              },
              mimLength: {
                value: 1,
                message: "Your concept must be mas than 1 characters",
              },
            })}
            label="Amount"
            type="number"
            id="amount"
            name="amount"
            className={classes.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            margin="normal"
            variant="outlined"
            helperText={
              errors.amount !== undefined ? errors.amount.message : ""
            }
          />
          <TextField
            error={errors.operation_date !== undefined}
            id="date"
            label="Date"
            type="date"
            name="operation_date"
            defaultValue={dateToday}
            onChange={handleChangeSubmit}
            inputRef={register({
              required: "You must provide a date.",
            })}
            inputProps={{
              max: "2030-01-01",
              min: "2020-01-01",
            }}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={
              errors.operation_date !== undefined
                ? errors.operation_date.message
                : ""
            }
          />
          <TextField
            error={errors.type !== undefined}
            onChange={handleChangeSubmit}
            inputRef={register({
              required: "You must provide a type.",
            })}
            id="type"
            name="type"
            select
            label="Select type"
            className={classes.textField}
            SelectProps={{
              native: true,
            }}
            helperText={errors.type !== undefined ? errors.type.message : ""}
            margin="normal"
            variant="outlined"
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <MuiAutoComplete
            categories={categories}
            setCategories={setCategories}
            autoC={autoC}
          />

          <Button
            style={{ marginTop: 50 }}
            margin="normal"
            type="submit"
            variant="contained"
            color="primary"
          >
            Create Operation
          </Button>
        </form>
      </div>
    </div>
  );
}
