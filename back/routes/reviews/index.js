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
router.post("/", createReview);
router.get("/:id", getReviewById);
router.delete("/:id", deleteReviewById);
router.put("/:id", updateReviewById);
router.delete("/archive/:id", archiveReviewById);
router.get("/user/list", authMiddleWare, getReviewsByToken);
export default router;
