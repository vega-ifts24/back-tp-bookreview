import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByToken,
  updateUser,
} from "../../controllers/userController.js";
import { authMiddleWare } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.use("", authMiddleWare);

router.get("/", authMiddleWare, getAllUsers);
router.get("/details", getUserByToken);
router.put("/details/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);

export default router;
