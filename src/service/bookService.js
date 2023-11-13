import BookModel from "../models/bookModel.js";
import ApiError from "../error/apiError.js";

class BookService {
  async getOne(bookId) {
    let book;
    const bookQuery = await BookModel.findOneAndUpdate(
      { _id: bookId },
      { $inc: { viewCount: 1 } },
      { returnDocument: "after" }
    ).then((doc, err) => {
      if (err) {
        throw ApiError.InternalServerError(
          "Ошибка сервера при получении книг",
          err
        );
      }
      if (!doc) {
        throw ApiError.BadRequest("Книга не найдена");
      }
      book = doc;
    });
    return book;
  }

  async update() {}

  async delete() {}

  async search(searchRegex) {
    const searchResults = await BookModel.find({
      title: searchRegex,
    }).exec();
    if (searchResults.length === 0) {
      throw ApiError.BadRequest("Упс ничего не найдено");
    }
    return searchResults;
  }
}

export default new BookService();
