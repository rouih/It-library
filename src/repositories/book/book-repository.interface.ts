import { SearchQueryType } from "../../types/search.type";
import { BookDto, CreateBookDto } from "../../dtos/book.dto";
import { BookType } from "../../types/book.type";

export interface IBookRepository {
  getAllBooks(): Promise<BookDto[]>;
  getBookById(bookId: string): Promise<BookType>;
  getBookByTitle(title: string): Promise<BookDto>;
  createBook(book: CreateBookDto): Promise<BookDto>;
  updateBook(id: string, book: Partial<BookDto>): Promise<BookDto>;
  deleteBook(id: string): Promise<void>;
  searchBook(queryParams: SearchQueryType): Promise<BookDto[]>;
  isBookAvailable(bookId: string): Promise<Boolean>;
  updateBookLoanStatus(bookId: string, status: Boolean);
}
