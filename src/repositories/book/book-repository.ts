import 'reflect-metadata'
import { IBookRepository } from "./book-repository.interface";
import { BookDto } from "../../dtos/book.dto";
import BookModel from "../../models/book.model"; // Assuming you have a Mongoose model for books
import { SearchQueryType } from "../../types/search.type";
import { injectable } from 'tsyringe';
import logger from '../../utils/winston-logger';
import { BookType } from '../../types/book.type';
import mongoose from 'mongoose';

@injectable()
export class BookRepository implements IBookRepository {

  async getBookById(bookId: string): Promise<BookType> {
    const res = await BookModel.findById(bookId)
    if (!res) {
      throw new Error(`Book with id "${bookId}" not found.`);
    }
    return res;
  }


  async updateBookLoanStatus(bookId: string, status: Boolean): Promise<void> {
    const result = await BookModel.findByIdAndUpdate(bookId, { available: status }, { new: true }).exec();

    if (!result) {
      throw new Error(`Book with id "${bookId}" not found.`);
    }
    logger.info(`Updated Book with id "${bookId}" status`)
  }


  async isBookAvailable(bookId: string): Promise<Boolean> {
    const book = await BookModel.findById(new mongoose.Types.ObjectId(bookId)).exec();
    if (!book) {
      throw new Error(`Book with title ${bookId} not found`);
    }
    return book.available;
  }

  async searchBook(queryParams: SearchQueryType): Promise<BookDto[]> {
    const queryResult = await BookModel.find(queryParams).lean();
    return queryResult;
  }
  async getAllBooks(): Promise<BookDto[]> {
    return await BookModel.find().lean();
  }

  async getBookByTitle(title: string): Promise<BookDto> {
    return await BookModel.findOne({ title }).lean();
  }

  async createBook(book: BookDto): Promise<BookDto> {
    const newBook = new BookModel(book);
    return await newBook.save();
  }

  async updateBook(id: string, book: Partial<BookDto>): Promise<BookDto> {
    return await BookModel.findByIdAndUpdate(id, book, { new: true }).lean();
  }

  async deleteBook(id: string): Promise<void> {
    const isBookAvailable = await this.isBookAvailable(id);
    if (!isBookAvailable) {
      throw new Error("Book is not available to delete");
    }
    return await BookModel.findByIdAndDelete(id);
  }
}
