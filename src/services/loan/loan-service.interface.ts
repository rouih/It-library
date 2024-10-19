import { CreateLoanDto, ReturnBookDto } from '../../dtos/loan.dto';
import { ILoan } from '../../models/loan.model';

export interface ILoanService {
  createLoan(userID: string, bookIds: string[]): Promise<ILoan>;
  returnBook(bookId: string, loanID: string): Promise<void>;
  getLoanedBooksByUser(userId: string): Promise<ILoan[]>;
  getAllLoanedBooks(): Promise<ILoan[]>;
}
