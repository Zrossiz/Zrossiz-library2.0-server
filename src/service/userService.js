import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import UserModel from "../models/userModel.js";
import UserDto from "../dtos/userDto.js";
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import ApiError from "../error/apiError.js";

class UserService {
  async registration(email, password, userName) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const activationLink = uuidv4();
    const user = await UserModel.create({
      email,
      userName,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest("Такой пользователь не найден");
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный email или пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...UserDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...UserDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async delete(id) {
    const user = await UserModel.findOneAndDelete({ _id: id }).then(
      (doc, err) => {
        if (err) {
          throw ApiError.BadRequest("Ошибка при удалении пользователя", err);
        }
      }
    );
    return user;
  }

  async update(userId, userName, password, avatarUrl, role) {
    let hashPassword;
    if (password) {
      hashPassword = await bcrypt.hash(password, 4);
    }
    const updateData = {
      userName,
      password: hashPassword,
      avatarUrl,
      role,
    };
    for (let i in updateData) {
      if (updateData[i] === "undefined") {
        delete updateData[i];
      }
    }
    const updatedUser = await UserModel.updateOne(
      {
        _id: userId,
      },
      updateData
    );
    return updatedUser;
  }
}

export default new UserService();
