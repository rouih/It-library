import { SearchQueryType } from "../../../types/search.type";
import { BookDto, CreateBookDto, UpdateBookDto } from "../../../dtos/book.dto";
import { IBookService } from "../book-service-index";

export class MockBookService implements IBookService {
    getBookById = jest.fn<Promise<BookDto>, [string]>();
    isBookAvailable = jest.fn<Promise<Boolean>, [string]>();
    updateBookLoanStatus = jest.fn<Promise<void>, [string, Boolean]>();
    getAllBooks = jest.fn<Promise<BookDto[]>, []>();
    getBookByTitle = jest.fn<Promise<BookDto>, [string]>();
    createBook = jest.fn<Promise<BookDto>, [CreateBookDto]>();
    updateBookByTitle = jest.fn<Promise<BookDto>, [string, UpdateBookDto]>();
    deleteBook = jest.fn<Promise<void>, [string]>();
    searchBook = jest.fn<Promise<BookDto[]>, [SearchQueryType]>();
}