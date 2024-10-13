import { CreateLoanBookDto, ILoan } from "../../dtos/loan.dto";

export interface ILoanRepository {
    // Create a new loan entry
    createLoan(userId: string, bookId: string, dueDate: Date): Promise<ILoan>;

    // Return a loan (mark the book as returned)
    returnBook(loanId: string, returnDate: Date): Promise<void>;

    // Get all loaned books by a specific user
    getLoanedBooksByUser(userId: string): Promise<ILoan[]>;

    // Get all currently loaned books (for employee view)
    getAllLoanedBooks(): Promise<ILoan[]>;


}