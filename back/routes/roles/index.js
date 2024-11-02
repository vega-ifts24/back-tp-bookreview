import express from "express";
import { authMiddleWare } from "../../middleware/authMiddleware.js";
import {
  getAllRoles,
  getRolById,
  createRol,
  deleteRol,
  updateRol,
} from "../../controllers/rolesController.js";

const router = express.Router();

router.get("/", getAllRoles);
router.get("/:id", authMiddleWare, getRolById);
router.post("/", authMiddleWare, createRol);
router.delete("/:id", authMiddleWare, deleteRol);
router.put("/:id", authMiddleWare, updateRol);

export default router;
