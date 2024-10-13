import 'reflect-metadata'
import { inject, injectable } from "tsyringe";
import { ILoanController } from "./loan-controller.interface";

@injectable()
export class LoanController implements ILoanController {
    loanBook(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    returnBook(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getLoanedBooks(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getLoansByUser(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getAllLoans(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}