import { SearchQueryType } from "src/types/search.type";
import { BookDto, CreateBookDto, UpdateBookDto } from "../../dtos/book.dto";
import { BookType } from "src/types/book.type";

export interface IBookService {
  getAllBooks(): Promise<BookDto[]>;
  getBookByTitle(title: string): Promise<BookDto>;
  getBookById(bookId: string): Promise<BookDto>;
  createBook(book: CreateBookDto): Promise<BookDto>;
  updateBookByTitle(title: string, updateData: UpdateBookDto): Promise<BookDto>;
  deleteBook(title: string): Promise<void>;
  searchBook(query: SearchQueryType): Promise<BookDto[]>;
  isBookAvailable(bookId: string): Promise<Boolean>;
  updateBookLoanStatus(bookId: string, isLoaned: boolean): Promise<void>;
}
