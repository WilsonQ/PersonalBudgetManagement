import { Router } from "express";
import { getLastOperations } from "../controllers/home.controller";

const router = Router();

router.get("/api/dashboard", getLastOperations);

export default router;
