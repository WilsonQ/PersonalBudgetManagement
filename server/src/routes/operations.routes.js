import { Router } from "express";
import {
  getOperations,
  getOperation,
  createOperation,
  updateOperation,
  deleteOperation,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
  searchStringOperation,
} from "../controllers/operations.controller";

const router = Router();

router.get("/api/operations", getOperations);
router.get("/api/operations/search/:str", searchStringOperation);
router.get("/api/operations/:id", getOperation);
router.post("/api/operations", createOperation);
router.put("/api/operations/:id", updateOperation);
router.delete("/api/operations/:id", deleteOperation);
//categories
router.get("/api/categories", getCategory);
router.get("/api/categories/:id", getOperation);
router.post("/api/categories", createCategory);
router.put("/api/categories/:id", updateCategory);
router.delete("/api/categories/:id", deleteCategory);

export default router;
