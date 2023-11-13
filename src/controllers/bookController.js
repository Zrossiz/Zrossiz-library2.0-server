import BookModel from "../models/bookModel.js";
import ApiError from "../error/apiError.js";
import bookService from "../service/bookService.js";

class BookController {
  async getAll(req, res, next) {
    try {
      const books = await BookModel.find();
      res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const bookId = req.params.id;
      const book = await bookService.getOne(bookId);
      return res.json(book);
    } catch (err) {
      next(err);
    }
  }

  async findBooks(req, res, next) {
    try {
      if (!req.body.title) {
        throw ApiError.BadRequest("Упс, ничего не найдено");
      }
      const searchRegex = new RegExp(`${req.body.title}`, "i");
      const searchResults = await bookService.search(searchRegex);
      return res.json(searchResults);
    } catch (err) {
      next(err);
    }
  }

  async updateBook() {}

  async createBook(req, res, next) {
    try {
      const data = new BookModel({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating,
        fileCover: req.body.fileCover,
        fileBook: req.file.originalname,
      });
      const newBook = await data.save();
      return res.json(newBook);
    } catch (err) {
      next(err);
    }
  }

  async deleteBook() {}
}

export default new BookController();
