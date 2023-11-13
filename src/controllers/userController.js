import { validationResult } from "express-validator";
import userService from "../service/userService.js";
import ApiError from "../error/apiError.js";

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, userName, password } = req.body;
      const userData = await userService.registration(
        email,
        password,
        userName
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("email", email, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("email", email, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const userId = req.params.id;
      const userName = req.body.userName;
      const password = req.body.password;
      const avatarUrl = req.body.avatarUrl;
      const role = req.body.role;
      const userData = userService.update(
        userId,
        userName,
        password,
        avatarUrl,
        role
      );
      return res.json({ message: "Пользователь успешно обновлен" });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const userData = userService.delete(id);
      res.clearCookie("refreshToken");
      res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      next(err);
    }
  }

  async updateFavorites(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getFavorites(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
