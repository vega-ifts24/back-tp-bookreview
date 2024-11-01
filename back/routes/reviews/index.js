import express from "express";
import {
  archiveReviewById,
  createReview,
  deleteReviewById,
  getAllReviews,
  getReviewById,
  getReviewsByToken,
  updateReviewById,
} from "../../controllers/reviewsController.js";
import { authMiddleWare } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllReviews);
router.post("/", authMiddleWare, createReview);
router.get("/:id", getReviewById);
router.delete("/:id", authMiddleWare, deleteReviewById);
router.put("/:id", authMiddleWare, updateReviewById);
router.delete("/archive/:id", authMiddleWare, archiveReviewById);
router.get("/user/list", authMiddleWare, getReviewsByToken);
export default router;
