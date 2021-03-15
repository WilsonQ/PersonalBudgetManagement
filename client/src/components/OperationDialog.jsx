import React, { useState, forwardRef, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import Tooltip from "@material-ui/core/Tooltip";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";

import { useForm } from "react-hook-form";
import MuiAutoComplete from "./muiAutoComplete";

import { updateOperation } from "../service/api/apiBackend";

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

export default function FullScreenDialog({ operation }) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const autoC = useRef(null);
  const { operation_date, concept, amount, operation_id, category } = operation;
  const { register, errors, handleSubmit } = useForm();
  const [categories, setCategories] = React.useState(category || []);

  const [dataSubmit, setDataSubmit] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [dateToday, setDateToday] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const onSubmit = (data, e) => {
    data.category = categories;
    data.operation_id = operation_id;
    console.log(data, dataSubmit);
    updateOperation(data);
    e.target.reset();
    const ele = autoC.current.getElementsByClassName(
      "MuiAutocomplete-clearIndcator"
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
      <Tooltip title="Update">
        <IconButton onClick={handleClickOpenDialog} aria-label="update">
          <EditIcon />
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
              Update Operation
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              Update
            </Button> */}
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
                defaultValue={concept}
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
                defaultValue={amount}
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
                error={errors.operation_datee !== undefined}
                id="date"
                label="Date"
                defaultValue={operation_date}
                type="date"
                name="operation_date"
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
                Update
              </Button>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
