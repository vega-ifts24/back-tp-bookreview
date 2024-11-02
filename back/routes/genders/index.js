import express from "express";
import { authMiddleWare } from "../../middleware/authMiddleware.js";
import {
  getAllGenders,
  getGenderById,
  createGender,
  deleteGender,
  updateGender,
} from "../../controllers/genderController.js";

const router = express.Router();

router.get("/", getAllGenders);
router.get("/:id", authMiddleWare, getGenderById);
router.post("/", authMiddleWare, createGender);
router.delete("/:id", authMiddleWare, deleteGender);
router.put("/:id", authMiddleWare, updateGender);

export default router;
