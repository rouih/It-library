import { SearchQueryType } from "src/types/search.type";
import { BookDto, CreateBookDto } from "../../dtos/book.dto";

export interface IBookRepository {
  getAllBooks(): Promise<BookDto[]>;
  getBookById(id: string): Promise<BookDto | null>;
  createBook(book: CreateBookDto): Promise<BookDto>;
  updateBook(id: string, book: Partial<BookDto>): Promise<BookDto | null>;
  deleteBook(id: string): Promise<void>;
  searchBook(queryParams: SearchQueryType): Promise<BookDto[]>;
}
