import { SearchQueryType } from "../../../types/search.type";
import { BookDto, CreateBookDto, UpdateBookDto } from "../../../dtos/book.dto";
import { IBookRepository } from "../book-repository.interface";
import { BookType } from "src/types/book.type";

export class MockBookRepository implements IBookRepository {
    isBookAvailable = jest.fn<Promise<Boolean>, [string]>();
    updateBookLoanStatus = jest.fn<Promise<void>, [string, Boolean]>();
    getBookById = jest.fn<Promise<BookType>, [string]>();
    getBookByTitle = jest.fn<Promise<BookDto>, [string]>();
    getAllBooks = jest.fn<Promise<BookDto[]>, []>();
    createBook = jest.fn<Promise<BookDto>, [CreateBookDto]>();
    updateBook = jest.fn<Promise<BookDto>, [string, UpdateBookDto]>();
    deleteBook = jest.fn<Promise<void>, [string]>();
    searchBook = jest.fn<Promise<BookDto[]>, [SearchQueryType]>();
}