import express from "express";
import bookRouter from "./bookRouter.js";
import userRouter from "./userRouter.js";
import commentRouter from "./commentRouter.js";

const router = express.Router();

router.use("/books", bookRouter);
router.use("/user", userRouter);
router.use("/comment", commentRouter);

export default router;
