import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import bookController from "../controllers/bookController.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.get("/", bookController.getAll);
router.post(
  "/create",
  upload.single("fileBook"),
  authMiddleware,
  bookController.createBook
);
router.get("/search", bookController.findBooks);
router.get("/:id", bookController.getOne);
router.delete("/:id", authMiddleware, bookController.deleteBook);
router.put(
  "/:id",
  upload.single("fileBook"),
  authMiddleware,
  bookController.updateBook
);

export default router;
