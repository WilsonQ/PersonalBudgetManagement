import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
/* const pgSession = require("connect-pg-simple")(session); */
import pgSession from "connect-pg-simple";

const pgs = pgSession(session);
import { pool } from "./config/connectionDatabase";

import homeRoute from "./routes/dashboard.routes";
import operationRoute from "./routes/operations.routes";
import usersRoute from "./routes/users.routes";
import initializePassport from "./config/passportConfig";
/* const pgs = pgSession(session); */
const app = express();

const PORT = process.env.PORT || 3001;

// settings
app.set("port", PORT);
initializePassport(passport);

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { user_id: 1 },
    store: new pgs({
      pool: pool, // Connection pool
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
// routes
app.use(homeRoute);
app.use(operationRoute);
app.use(usersRoute);

export default app;
