import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.get("/", bookController.getAll);
router.post("/create", authMiddleware, bookController.createBook);
router.get("/search", bookController.findBooks);
router.get("/:id", bookController.getOne);
router.delete("/:id", authMiddleware, bookController.deleteBook);
router.put("/:id", authMiddleware, bookController.updateBook);

export default router;
