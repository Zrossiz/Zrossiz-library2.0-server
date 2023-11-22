import BookModel from "../models/bookModel.js";
import ApiError from "../error/apiError.js";
import bookService from "../service/bookService.js";

class BookController {
  async getAll(req, res, next) {
    try {
      const books = await BookModel.find();
      res.status(200).json({
        length: books.length,
        data: books,
      });
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
      return res.json({
        length: searchResults.length,
        data: { ...searchResults },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateBook(req, res, next) {
    try {
      const bookId = req.params.id;
      const { email } = req.cookies;
      const data = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating,
        fileCover: req.body.fileCover,
        fileBook: req?.file?.originalname,
        createdBy: email,
      };
      const updatedBook = await bookService.update(bookId, email, data);
      res.json({
        message: "Книга успешно обновлена",
      });
    } catch (err) {
      next(err);
    }
  }

  async createBook(req, res, next) {
    try {
      const { email } = req.cookies;
      const data = new BookModel({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating,
        fileCover: req.body.fileCover,
        fileBook: req.file.originalname,
        createdBy: email,
      });
      const newBook = await data.save();
      return res.json({
        message: "Книга успешно создана",
        book: newBook,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const bookId = req.params.id;
      const { email } = req.cookies;
      const deletedBook = await bookService.delete(bookId, email);
      res.json({
        message: "Книга успешно удалена",
        book: deletedBook,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new BookController();
