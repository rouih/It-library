import { IBookRepository } from "./book-repository.interface";
import { BookDTO } from "../../dtos/book.dto";
import BookModel from "../../models/book.model"; // Assuming you have a Mongoose model for books
import { SearchTypeQuery } from "src/types/search.type";

export class BookRepository implements IBookRepository {
  async searchBook(queryParams: SearchTypeQuery): Promise<BookDTO[]> {
    let query = {};
    Object.keys(queryParams).forEach((key) => {
      let isStringParam = typeof queryParams[key] === "string";
      if (isStringParam) {
        query[key] = { $regex: queryParams[key], $options: "i" };
      }else {
        query[key] = queryParams[key];
      }
    });

    const queryResult = await BookModel.find(query).lean();
    return queryResult;
  }
  async getAllBooks(): Promise<BookDTO[]> {
    return await BookModel.find().lean();
  }

  async getBookById(id: string): Promise<BookDTO | null> {
    return await BookModel.findById(id).lean();
  }

  async createBook(book: BookDTO): Promise<BookDTO> {
    const newBook = new BookModel(book);
    return await newBook.save();
  }

  async updateBook(
    id: string,
    book: Partial<BookDTO>
  ): Promise<BookDTO | null> {
    return await BookModel.findByIdAndUpdate(id, book, { new: true }).lean();
  }

  async deleteBook(id: string): Promise<void> {
    await BookModel.findByIdAndDelete(id);
  }
}
