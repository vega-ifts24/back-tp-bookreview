import express from "express";
import { authMiddleWare } from "../../middleware/authMiddleware.js";
import {
  getAllBanners,
  getBannerById,
  createBanner,
  deleteBanner,
  updateBanner,
} from "../../controllers/bannersController.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

router.get("/", getAllBanners);
router.get("/:id", authMiddleWare, getBannerById);
router.post("/", authMiddleWare, upload.single("imageLink"), createBanner);
router.delete("/:id", authMiddleWare, deleteBanner);
router.put("/:id", authMiddleWare, updateBanner);

export default router;
