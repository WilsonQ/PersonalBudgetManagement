import React, { useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import PersonPinIcon from "@material-ui/icons/PersonPin";

import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { register, errors, handleSubmit, watch } = useForm();
  const [data, setData] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [name, setName] = useState("nadie");
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data, e) => {
    console.log(data);

    e.target.reset();
  };

  function handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
    setConfirm(false);

    if (event.target.name === "firstName") {
      setName(event.target.value);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonPinIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up for your account
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.firstName !== undefined}
                onChange={handleChange}
                inputRef={register({
                  required: "You must provide a name.",
                  pattern: {
                    value: /^[a-z  A-Z\u0590-\u05fe]*$/,
                    message: "Your name should contain only letters!",
                  },
                  maxLength: {
                    value: 12,
                    message: "Your password must be Less than 12 characters",
                  },
                })}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                helperText={
                  errors.firstName !== undefined ? errors.firstName.message : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.lastName !== undefined}
                onChange={handleChange}
                inputRef={register({
                  required: "You must provide last name.",
                  pattern: {
                    value: /^[a-z  A-Z\u0590-\u05fe]*$/,
                    message: "Your last name should contain only letters!",
                  },
                  maxLength: {
                    value: 12,
                    message: "Your password must be Less than 12 characters",
                  },
                })}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                helperText={
                  errors.lastName !== undefined ? errors.lastName.message : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.email !== undefined}
                onChange={handleChange}
                inputRef={register({
                  required: "You must provide the email address!",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "You must provide a valid email address!",
                  },
                })}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={
                  errors.email !== undefined ? errors.email.message : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password !== undefined}
                onChange={handleChange}
                inputRef={register({
                  required: "You must provide a password.",
                  minLength: {
                    value: 6,
                    message: "Your password must be greater than 6 characters",
                  },
                })}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={
                  errors.password !== undefined ? errors.password.message : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password2 !== undefined}
                onChange={handleChange}
                inputRef={register({
                  required: "You must provide a password.",
                  validate: {
                    isMatch: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  },
                })}
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Repeat Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                helperText={
                  errors.password2 !== undefined ? errors.password2.message : ""
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
