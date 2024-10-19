import 'reflect-metadata'
import { inject, injectable } from "tsyringe";
import { ILoanController } from "./loan-controller.interface";
import { ILoanService } from '../../../services/loan/loan-service.interface';
import logger from '../../../utils/winston-logger';

@injectable()
export class LoanController implements ILoanController {
    constructor(@inject("ILoanService") private loanService: ILoanService) { }

    async loanBook(req: any, res: any, next: any): Promise<void> {
        logger.info("Loan book request received");
        try {
            const query = req.body;
            if (query) {
                const { userId, bookIds } = query;
                const loan = await this.loanService.createLoan(userId, bookIds);
                if (loan)
                    res.status(201).json(loan);
                else throw new Error("Loan not created beacuse of insufficient book availability");
            }
        } catch (error) {
            next(error);
        }
    }
    async returnBook(req: any, res: any, next: any): Promise<void> {
        logger.info("Return book request received");
        try {
            const query = req.body;
            if (query) {
                const { loanId, bookId } = query;
                await this.loanService.returnBook(bookId, loanId);
                logger.info("Book returned successfully");
                res.status(200).json({ message: "Book returned successfully" });
            }
        } catch (error) {
            next(error);
        }
    }
    async getLoansByUser(req: any, res: any, next: any): Promise<void> {
        logger.info("Get loaned books request received");
        try {
            const { id } = req.params;
            if (id) {
                const loan = await this.loanService.getLoanedBooksByUser(id);
                res.status(200).json(loan);
            }
        } catch (error) {
            next(error);
        }
    }
    async getAllLoans(req: any, res: any, next: any): Promise<void> {
        logger.info("Get All loans request received");
        try {
            const loans = await this.loanService.getAllLoanedBooks();
            res.status(200).json(loans);
        } catch (error) {
            next(error);
        }
    }
}