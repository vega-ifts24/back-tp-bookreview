// back/routes/index.js
import express from "express";
import booksRouter from "./books/index.js";
import reviewsRouter from "./reviews/index.js";
import authRouter from "./auth/index.js";
import userRouter from "./users/index.js";
import genderRouter from "./genders/index.js";
import rolesRouter from "./roles/index.js";
import bannersRouter from "./banners/index.js";

const router = express.Router();

router.get("/", async (_, res) => {
  res.send("📚 Api Bookreview");
});
router.use("/books", booksRouter); // Usar las rutas de libros para el prefijo /books
router.use("/reviews", reviewsRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/genders", genderRouter);
router.use("/roles", rolesRouter);
router.use("/banners", bannersRouter);

export default router;
