import { SearchQueryType } from "../../../types/search.type";
import { BookDto, CreateBookDto, UpdateBookDto } from "../../../dtos/book.dto";
import { IBookRepository } from "../book-repository.interface";

export class MockBookRepository implements IBookRepository {
    getAllBooks = jest.fn<Promise<BookDto[]>, []>();
    getBookById = jest.fn<Promise<BookDto>, [string]>();
    createBook = jest.fn<Promise<BookDto>, [CreateBookDto]>();
    updateBook = jest.fn<Promise<BookDto>, [string, UpdateBookDto]>();
    deleteBook = jest.fn<Promise<void>, [string]>();
    searchBook = jest.fn<Promise<BookDto[]>, [SearchQueryType]>();
}