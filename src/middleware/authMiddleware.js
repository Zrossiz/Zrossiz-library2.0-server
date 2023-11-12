import ApiError from "../error/apiError.js";
import tokenService from "../service/tokenService.js";

export default (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      console.log("Ошибка 1");
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      console.log("Ошибка 2");
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      console.log("Ошибка 3");
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
