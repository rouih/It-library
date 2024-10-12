import 'reflect-metadata'
import { IBookService } from "./book-service.interface";
import { IBookRepository,BookRepository } from "../../repositories/book/book-repository-index";
import { BookDTO, CreateBookDTO, UpdateBookDTO } from "../../dtos/book.dto";
import { SearchQueryType } from "src/types/search.type";
import { inject, injectable } from 'tsyringe';

@injectable()
export class BookService implements IBookService {

  constructor(@inject('IBookRepository') private bookRepository: IBookRepository) {
  }
  async searchBook(queryParams: SearchQueryType): Promise<BookDTO[]> {
    return await this.bookRepository.searchBook(queryParams);
  }

  async getAllBooks(): Promise<BookDTO[]> {
    return await this.bookRepository.getAllBooks();
  }

  async getBookById(id: string): Promise<BookDTO> {
    return await this.bookRepository.getBookById(id);
  }

  async createBook(book: CreateBookDTO): Promise<BookDTO> {
    return await this.bookRepository.createBook(book);
  }

  async updateBook(id: string,book: UpdateBookDTO): Promise<BookDTO> {
    return await this.bookRepository.updateBook(id, book);
  }

  async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}
