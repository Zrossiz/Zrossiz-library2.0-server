import express from "express";
import CommentController from "../controllers/commentController.js";

const router = express.Router();

router.post("/:id", CommentController.create);
router.delete("/:id", CommentController.delete);
router.put("/:id", CommentController.update);

export default router;
