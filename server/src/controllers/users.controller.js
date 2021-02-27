import { pool } from "../config/connectionDatabase";
import passport from "passport";

import bcrypt from "bcrypt";

export const userRegister = async (req, res) => {
  await res.send("register");
};
export const userLogin = async (req, res) => {
  await res.send("login");
};
export const getDashboard = async (req, res) => {
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
export const postLogin = passport.authenticate("local", {
  successRedirect: "/api/users/dashboard",
  failureRedirect: "/api/users/login",
  failureFlash: true,
  session: true,
});
export const createUser = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  console.log(
    "~ createUser ~ name, email, password, password2",
    name,
    email,
    password,
    password2
  );
  let errors = [];

  if (!name || !email || !password || !password2) {
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
      console.table(errors);
    } else {
      const response = await pool.query(
        "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING user_id,password",
        [name, email, hashedPassword]
      );
      console.log(response.rows);
      res.json({
        message: ["Success", "You are now registered. Please log in"],
      });
    }
  }
};
