import 'reflect-metadata'
import { ILoan } from "../../models/loan.model";
import { ILoanService } from "./loan-service.interface";
import { CreateLoanDto, ReturnBookDto } from "../../dtos/loan.dto";
import { inject, injectable } from "tsyringe";
import { ILoanRepository } from '../../repositories/loan/loan-repository.interface';
import { IBookService } from '../book/book-service-index';
import logger from '../../utils/winston-logger';
import { LOAN_MAX_BOOKS, LOAN_PERIODS } from '../../config/loans-metadata.config';
import { LoanBookType } from '../../types/book.type';
@injectable()
export class LoanService implements ILoanService {
    constructor(@inject('ILoanRepository') private loanRepository: ILoanRepository, @inject("IBookService") private bookService: IBookService) {
    }

    private calculateReturnDate(rating: number): Date {
        let daysToAdd: number;

        if (rating <= 3) {
            daysToAdd = LOAN_PERIODS.LOW_RATING;
        } else if (rating === 4) {
            daysToAdd = LOAN_PERIODS.MEDIUM_RATING;
        } else {
            daysToAdd = LOAN_PERIODS.HIGH_RATING;
        }

        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + daysToAdd);  // Add the appropriate number of days
        return returnDate;
    }

    async createLoan(userID: string, bookIds: string[]): Promise<ILoan> {
        const existingLoan = await this.loanRepository.getLoanByUserId(userID);
        const currentLoanCount = existingLoan
            ? existingLoan.loanedBooks.filter(book => !book.returnDate).length : 0;

        if (currentLoanCount + bookIds.length > LOAN_MAX_BOOKS) {
            throw new Error('User has reached the maximum loan limit of 5 books.');
        }

        const booksToLoan: LoanBookType[] = [];
        for (const bookId of bookIds) {
            if (!await this.bookService.isBookAvailable(bookId)) {
                logger.error(`Book with id ${bookId} is not available`);
                continue;
            }
            const book = await this.bookService.getBookById(bookId);
            const returnDate = this.calculateReturnDate(book.rating);
            await this.bookService.updateBookLoanStatus(bookId, false);
            booksToLoan.push({ bookId, returnDate })
        }

        return booksToLoan.length > 0 ? await this.loanRepository.createLoan(userID, booksToLoan) : null;
    }

    async returnBook(bookId: string, loanID: string): Promise<void> {
        await Promise.all([
            this.loanRepository.returnBook(loanID, bookId),
            this.bookService.updateBookLoanStatus(bookId, true)
        ]);
    }
    async getLoanedBooksByUser(userId: string): Promise<ILoan[]> {
        return await this.loanRepository.getAllBooksLoanedByUser(userId);
    }
    async getAllLoanedBooks(): Promise<ILoan[]> {
        return await this.loanRepository.getAllLoans();
    }
}