import { ILoan } from "src/dtos/loan.dto";
import { ILoanRepository } from "./loan-repository.interface";
import { injectable } from "tsyringe";

@injectable()
export class LoanRepository implements ILoanRepository {
    createLoan(userId: string, bookId: string, dueDate: Date): Promise<ILoan> {
        throw new Error("Method not implemented.");
    }
    returnBook(loanId: string, returnDate: Date): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLoanedBooksByUser(userId: string): Promise<ILoan[]> {
        throw new Error("Method not implemented.");
    }
    getAllLoanedBooks(): Promise<ILoan[]> {
        throw new Error("Method not implemented.");
    }
}