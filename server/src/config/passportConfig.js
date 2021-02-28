import { pool } from "./connectionDatabase";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
//provisorio
import { setUser } from "./provisorio";

function initialize(passport) {
  console.log("Initialized");

  const authenticateUser = async (email, password, done) => {
    console.log(email, password);
    const results = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (results.rows.length > 0) {
      const user = results.rows[0];
      setUser(user);

      //console.log(results.rows);
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (isMatch) {
          console.log("return", user);
          return done(null, user);
        } else {
          //password is incorrect
          console.log("incorrect");
          return done(null, false, { message: "Password is incorrect" });
        }
      } catch (error) {
        console.error("Error:- line 30 -", error);
      }
    } else {
      // No user
      return done(null, false, {
        message: "No user with that email address",
      });
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user.user_id));

  passport.deserializeUser(async (user_id, done) => {
    console.log("estoy dentro");
    const results = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
      user_id,
    ]);
    console.log(`ID is ${results.rows[0].user_id}`);
    return done(null, results.rows[0]);
  });
}

module.exports = initialize;
