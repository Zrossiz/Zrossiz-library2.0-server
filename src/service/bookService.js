import BookModel from "../models/bookModel.js";
import ApiError from "../error/apiError.js";

class BookService {
  
  async getOne(bookId) {
    let book;
    const bookQuery = await BookModel.findOneAndUpdate(
      { _id: bookId },
      { $inc: { views: 1 } },
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

  async update(bookId, email, data) {
    const book = await BookModel.findById(bookId);

    if (book.createdBy != email) {
      throw ApiError.BadRequest(
        "Вы можете удалять и обновлять только созданные вами книги"
      );
    }
    for (let i in data) {
      if (data[i] === "undefined") {
        delete data[i];
      }
    }
    const updatedBook = await BookModel.updateOne(
      {
        _id: bookId,
      },
      data
    );
    return updatedBook;
  }

  async delete(bookId, email) {
    const book = await BookModel.findById({ _id: bookId });
    if (book.createdBy != email) {
      throw ApiError.BadRequest(
        "Вы можете удалять и обновлять только созданные вами книги"
      );
    }
    const deletedBook = await book.deleteOne();
    return book;
  }

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
