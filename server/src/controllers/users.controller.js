import { pool } from "../config/connectionDatabase";
import passport from "passport";

import bcrypt from "bcrypt";

export const userRegister = async (req, res) => {
  await res.send("register");
};
export const userLogin = (req, res) => {
  res.status(200).json({ message: "success", user: req.user });
};
export const getUser = async (req, res) => {
  console.log("que pasa men", req.user);
  res.status(200).json({ message: "success", user: req.user });
};
export const logout = (req, res) => {
  try {
    req.logout();
    //res.redirect("/api/users/login");
    res
      .status(200)
      .json({ status: "success", message: "You have logged out successfully" });
  } catch (error) {
    console.error("Error line 23:", error);
  }

  // res
  //   .status(200)
  //   .json({ message: "success", bodyMessage: "You have logged out" });
};
/* passport.authenticate("local", {
  successRedirect: "/api/users/data",
  failureRedirect: "/api/users/login",
  failureFlash: true,
  session: true,
}); */
export const postLogin = (req, res, next) => {
  passport.authenticate(
    "local",
    {
      successRedirect: "/api/users/data",
      failureRedirect: "/api/users/login",
      failureFlash: true,
      session: true,
    },
    (err, user, info) => {
      console.log("-----> info,req", info, req.body);
      if (err) {
        return res.status(400).json({ errors: err });
      }
      if (!user) {
        return res.status(400).json({ errors: info });
      } else {
        console.log(user.id);
        req.login(user, (err) => {
          if (err) {
            throw err;
          }
        });
        return res.status(200).json({
          success: true,
          message: `Welcome back ${user.name}`,
          user: user,
        });
      }
    }
  )(req, res, next);
};

export const createUser = async (req, res) => {
  const { name, surname, email, password, password2 } = req.body;
  console.log("que trae el body", req.body);
  let errors = [];

  if (!name || !surname || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }
  if (password != password2) {
    errors.push({ message: "Password do not match" });
  }

  if (errors.length > 0) {
    console.table(errors);
    res.status(400).json(errors);
  } else {
    //form validation has passed
    let hashedPassword = await bcrypt.hash(password, 10);

    const resp = await pool.query(
      `SELECT * FROM users
                WHERE email = $1`,
      [email]
    );
    console.log(resp.rows);
    if (resp.rows.length > 0) {
      errors.push({ message: "Email already Registered" });
      res.status(400).json(errors);
    } else {
      const response = await pool.query(
        "INSERT INTO users (name,surname,email,password) VALUES ($1,$2,$3,$4) RETURNING user_id,password",
        [name, surname, email, hashedPassword]
      );
      console.log(response.rows);
      res.status(200).json({
        message: ["Success", "You are now registered. Please log in"],
      });
    }
  }
};
