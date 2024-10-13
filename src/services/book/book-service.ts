import 'reflect-metadata'
import { IBookService } from "./book-service.interface";
import { IBookRepository, BookRepository } from "../../repositories/book/book-repository-index";
import { BookDto, CreateBookDto, UpdateBookDto } from "../../dtos/book.dto";
import { SearchQueryType } from "src/types/search.type";
import { inject, injectable } from 'tsyringe';

@injectable()
export class BookService implements IBookService {

  constructor(@inject('IBookRepository') private bookRepository: IBookRepository) {
  }
  async searchBook(queryParams: SearchQueryType): Promise<BookDto[]> {
    return await this.bookRepository.searchBook(queryParams);
  }

  async getAllBooks(): Promise<BookDto[]> {
    return await this.bookRepository.getAllBooks();
  }

  async getBookByTitle(id: string): Promise<BookDto> {
    return await this.bookRepository.getBookById(id);
  }

  async createBook(book: CreateBookDto): Promise<BookDto> {
    return await this.bookRepository.createBook(book);
  }

  async updateBookByTitle(id: string, book: UpdateBookDto): Promise<BookDto> {
    return await this.bookRepository.updateBook(id, book);
  }

  async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}
