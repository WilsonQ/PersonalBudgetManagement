import { Router } from "express";
import passport from "passport";
import {
  userLogin,
  userRegister,
  createUser,
  postLogin,
  getUser,
  logout,
} from "../controllers/users.controller";

const router = Router();

router.get("/api/users/register", checkAuthenticated, userRegister);
router.get("/api/users/login", checkAuthenticated, userLogin);
router.post("/api/users/register", checkAuthenticated, createUser);
router.post("/api/users/login", checkAuthenticated, postLogin);
router.get("/api/users/logout", logout);
router.get("/api/users/data", checkAuthenticated, getUser);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/api/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/users/login");
}
export default router;
