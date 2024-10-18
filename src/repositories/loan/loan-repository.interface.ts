import { LoanBookType } from '../../types/book.type';
import { ILoan } from '../../models/loan.model';

export interface ILoanRepository {
    createLoan(userID: string, booksToLoan: LoanBookType[]): Promise<ILoan>;
    getLoanByUserId(userID: string): Promise<ILoan | null>;
    getLoanById(loanID: string): Promise<ILoan | null>;
    returnBook(loanID: string, bookId: string): Promise<void>;
    getAllLoans(): Promise<ILoan[]>;
}
