import { SearchTypeQuery } from "src/types/search.type";
import { BookDTO } from "../../dtos/book.dto";

export interface IBookService {
  getAllBooks(): Promise<BookDTO[]>;
  getBookById(id: string): Promise<BookDTO | null>;
  createBook(book: BookDTO): Promise<BookDTO>;
  updateBook(id: string, book: Partial<BookDTO>): Promise<BookDTO | null>;
  deleteBook(id: string): Promise<void>;
  searchBook(query: SearchTypeQuery): Promise<BookDTO[]>;
}
