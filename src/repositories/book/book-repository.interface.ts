import { SearchQueryType } from "src/types/search.type";
import { BookDTO, CreateBookDTO } from "../../dtos/book.dto";

export interface IBookRepository {
  getAllBooks(): Promise<BookDTO[]>;
  getBookById(id: string): Promise<BookDTO | null>;
  createBook(book: CreateBookDTO): Promise<BookDTO>;
  updateBook(id: string, book: Partial<BookDTO>): Promise<BookDTO | null>;
  deleteBook(id: string): Promise<void>;
  searchBook(queryParams: SearchQueryType): Promise<BookDTO[]>;
}
