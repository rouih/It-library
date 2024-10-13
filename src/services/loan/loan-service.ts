import 'reflect-metadata'
import { ILoan } from "src/models/loan.model";
import { ILoanService } from "./loan-service.interface";
import { CreateLoanBookDto, ReturnBookDto } from "src/dtos/loan.dto";
import { inject, injectable } from "tsyringe";
import { LoanRepository } from 'src/repositories/loan/loan-repository';

@injectable()
export class LoanService implements ILoanService {
    constructor(@inject('ILoanRepository') private loanRepository: ILoanService) {

    }
    async createLoan(createBookDto: CreateLoanBookDto): Promise<ILoan> {
        throw new Error('Method not implemented.');
    }
    async returnBook(returnBookDto: ReturnBookDto): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async getLoanedBooksByUser(userId: string): Promise<ILoan[]> {
        throw new Error('Method not implemented.');
    }
    async getAllLoanedBooks(): Promise<ILoan[]> {
        throw new Error('Method not implemented.');
    }
}