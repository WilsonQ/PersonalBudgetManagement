import { Router } from "express";
import {
  getOperations,
  getOperation,
  createOperation,
  updateOperation,
  deleteOperation,
} from "../controllers/operations.controller";

const router = Router();

router.get("/api/operations", getOperations);
router.get("/api/operations/:id", getOperation);
router.post("/api/operations", createOperation);
router.put("/api/operations/:id", updateOperation);
router.delete("/api/operations/:id", deleteOperation);

export default router;
