import React, { useState, forwardRef, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import moment from "moment";

import { useForm, Controller } from "react-hook-form";
import MuiAutoComplete from "./muiAutoComplete";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
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
    const ele = autoC.current.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    if (ele) ele.click();
  };
  function handleChangeSubmit(event, data) {
    setDataSubmit({ ...dataSubmit, [event.target.name]: event.target.value });
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton onClick={handleClickOpenDialog} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
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
                error={errors.date !== undefined}
                id="date"
                label="Date"
                type="date"
                name="date"
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
                  errors.date !== undefined ? errors.date.message : ""
                }
              />
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
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
