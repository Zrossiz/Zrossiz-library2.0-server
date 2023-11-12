import express from "express";
import { body } from "express-validator";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 42 }),
  body("userName").isLength({ min: 3, max: 12 }),
  UserController.registration
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 42 }),
  UserController.login
);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/all", authMiddleware, UserController.getAllUsers);
router.get("/refresh", UserController.refresh);
router.put("/:id", authMiddleware, UserController.update);
router.delete("/:id", authMiddleware, UserController.delete);
router.get("/:id/favorites", authMiddleware, UserController.getFavorites);
router.put(":id/favorites", authMiddleware, UserController.updateFavorites);

export default router;
