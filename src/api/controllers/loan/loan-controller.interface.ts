export interface ILoanController {
    loanBook(req: any, res: any, next: any): Promise<void>;
    returnBook(req: any, res: any, next: any): Promise<void>;
    getLoansByUser(req: any, res: any, next: any): Promise<void>;
    getAllLoans(req: any, res: any, next: any): Promise<void>;
}