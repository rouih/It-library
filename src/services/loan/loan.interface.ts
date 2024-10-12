import { ILoan } from '../models/loan.model';

export interface ILoanService {
  createLoan(userId: string, bookId: string): Promise<ILoan>;
  returnBook(userId: string, bookId: string): Promise<void>;
  getLoanedBooksByUser(userId: string): Promise<ILoan[]>;
  getAllLoanedBooks(): Promise<ILoan[]>;
}
