
import 'reflect-metadata'
import { BookService } from '../book-service';
import { BookDto, CreateBookDto, UpdateBookDto } from '../../../dtos/book.dto';
import { container } from 'tsyringe';
import { IBookRepository } from '../../../repositories/book/book-repository.interface';
import { MockBookRepository } from '../../../repositories/book/tests/mock-book-repository';
import { MockBookService } from './mock-book-service';
import { IBookService } from '../book-service.interface';

describe('BookService', () => {
    let bookService: BookService;
    let mockBookRepository: MockBookRepository;
    let mockBookService: MockBookService;

    beforeAll(() => {
        mockBookRepository = new MockBookRepository();
        mockBookService = new MockBookService();
        container.registerInstance<IBookRepository>("IBookRepository", mockBookRepository);
        container.registerInstance<IBookService>("IBookService", mockBookService);
        bookService = container.resolve(BookService);
    });
    describe('getBooks()', () => {
        it('should return an array of BookDto objects', async () => {
            const mockBooks: BookDto[] = [
                { title: 'Mock Book 1', author: 'Author 1', year: 2000, topic: 'Topic 1', rating: 4.5, available: true },
                { title: 'Mock Book 2', author: 'Author 2', year: 2010, topic: 'Topic 2', rating: 4.8, available: false }
            ];
            mockBookRepository.getAllBooks.mockResolvedValue(mockBooks);

            const result = await bookService.getAllBooks();

            expect(result).toEqual(mockBooks);
        });
    });

    describe('searchBook()', () => {
        it('should return a single BookDto object', async () => {
            const mockBook: BookDto[] = [{ title: 'Mock Book', author: 'John Doe', year: 2020, topic: 'Math', rating: 4.5, available: true }];

            mockBookRepository.getAllBooks.mockResolvedValue(mockBook);

            const result = await bookService.searchBook({ title: 'Mock Book' });

            expect(result).toEqual(mockBook);
        });
    });

    describe('createBook()', () => {
        it('should create a new book and return its DTO', async () => {
            const mockBookDto: BookDto = {
                title: 'New Book',
                author: 'Jane Smith',
                year: 2023,
                topic: 'Fiction',
                rating: 4.5,
                available: true
            };

            mockBookRepository.createBook.mockResolvedValue(mockBookDto);

            const result = await bookService.createBook({
                title: 'New Book',
                author: 'Jane Smith',
                year: 2023,
                topic: 'Fiction',
                rating: 4.5,
                available: true
            });

            expect(result).toBe(mockBookDto);
        });
    });

    describe('updateBook()', () => {
        it('should update an existing book', async () => {
            let title = 'New Book';
            const mockBookDto: UpdateBookDto = {
                author: 'Jane Riche'
            };

            const newBookDto: BookDto = {
                title: title,
                author: 'Jane Riche',
                year: 2023,
                topic: 'Fiction',
                rating: 4.5,
                available: true
            };
            mockBookRepository.updateBook.mockResolvedValue(newBookDto);

            const result = await bookService.updateBookByTitle(title, mockBookDto);

            expect(result).toBe(newBookDto);
        });
    });

    describe('deleteBook()', () => {
        it('should delete a book', async () => {
            const mockBookId = 'New Book';

            mockBookRepository.deleteBook.mockResolvedValue(undefined);

            await bookService.deleteBook(mockBookId);

            expect(mockBookRepository.deleteBook).toHaveBeenCalledWith(mockBookId);
        });
    });
});