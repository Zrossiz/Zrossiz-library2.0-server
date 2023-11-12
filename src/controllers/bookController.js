import BookModel from "../models/bookModel.js";
import ApiError from "../error/apiError.js";

class BookController {
  async getAll(req, res, next) {
    try {
      const books = await BookModel.find();
      res.status(200).json(books);
    } catch (err) {
      throw ApiError.BadRequest("Ошибка при получении книг", err);
    }
  }

  async getOne(req, res, next) {
    try {
      const bookId = req.params.id;
      const book = await BookModel.findOneAndUpdate(
        { _id: bookId },
        { $inc: { viewCount: 1 } },
        { returnDocument: "after" }
      ).then((doc, err) => {
        if (err) {
          throw ApiError.InternalServerError(
            "Ошибка сервера прип получении книг",
            err
          );
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async findBooks() {}

  async updateBook() {}

  async createBook() {}

  async deleteBook() {}
}

export default new BookController();
