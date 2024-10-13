import { CreateLoanBookDto, ReturnBookDto } from 'src/dtos/loan.dto';
import { ILoan } from '../../models/loan.model';

export interface ILoanService {
  createLoan(createBookDto: CreateLoanBookDto): Promise<ILoan>;
  returnBook(returnBookDto: ReturnBookDto): Promise<void>;
  getLoanedBooksByUser(userId: string): Promise<ILoan[]>;
  getAllLoanedBooks(): Promise<ILoan[]>;
}
