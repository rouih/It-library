import 'reflect-metadata'
import { IBookRepository } from "./book-repository.interface";
import { BookDto } from "../../dtos/book.dto";
import BookModel from "../../models/book.model"; // Assuming you have a Mongoose model for books
import { SearchQueryType } from "src/types/search.type";
import { injectable } from 'tsyringe';

@injectable()
export class BookRepository implements IBookRepository {
  async searchBook(queryParams: SearchQueryType): Promise<BookDto[]> {
    const queryResult = await BookModel.find(queryParams).lean();
    return queryResult;
  }
  async getAllBooks(): Promise<BookDto[]> {
    return await BookModel.find().lean();
  }

  async getBookById(id: string): Promise<BookDto> {
    return await BookModel.findById(id).lean();
  }

  async createBook(book: BookDto): Promise<BookDto> {
    const newBook = new BookModel(book);
    return await newBook.save();
  }

  async updateBook(id: string, book: Partial<BookDto>): Promise<BookDto> {
    return await BookModel.findByIdAndUpdate(id, book, { new: true }).lean();
  }

  async deleteBook(id: string): Promise<void> {
    await BookModel.findByIdAndDelete(id);
  }
}
