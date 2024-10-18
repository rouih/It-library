import { ILoanRepository } from '../loan/loan-repository.interface';
import LoanModel, { ILoan } from '../../models/loan.model';
import { injectable } from 'tsyringe';
import mongoose, { Types } from 'mongoose';
import { LoanBookType } from '../../types/book.type';

@injectable()
export class LoanRepository implements ILoanRepository {



    private updateExistingLoan(booksToLoan: LoanBookType[], existingLoan: ILoan): ILoan {
        for (const book of booksToLoan) {
            existingLoan.loanedBooks.push({
                book: new mongoose.Types.ObjectId(book.bookId),
                loanDate: new Date(),
                returnDate: book.returnDate,
                actualReturnDate: null
            })
        }
        return existingLoan;
    }

    async createLoan(userID: string, booksToLoan: LoanBookType[]): Promise<ILoan> {
        let existingLoan = await this.getLoanByUserId(userID);

        if (existingLoan) {
            existingLoan = this.updateExistingLoan(booksToLoan, existingLoan);
            await existingLoan.save();
            return existingLoan;
        }
        existingLoan = new LoanModel({
            loanID: new mongoose.Types.ObjectId().toHexString(),
            userID: userID,
            loanedBooks: booksToLoan.map(book => ({
                book: book.bookId,
                loanDate: new Date().toDateString(),
                returnDate: book.returnDate,
                actualReturnDate: null
            }))

        });
        return await existingLoan.save();
    }

    async getLoanByUserId(userID: string): Promise<ILoan | null> {
        return await LoanModel.findOne({ userID }).populate('loanedBooks.book').exec();
    }

    async getAllBooksLoanedByUser(userID: string): Promise<ILoan[]> {
        return await LoanModel.find({ userID }).populate('loanedBooks.book').exec();
    }

    async getAllLoansOfUser(userID: string): Promise<ILoan[]> {
        return await LoanModel.find({ userID }).populate('loanedBooks.book').exec();
    }

    async getLoanById(loanID: string): Promise<ILoan | null> {
        return await LoanModel.findOne({ loanID }).populate('loanedBooks.book').exec();
    }

    async returnBook(loanID: string, bookId: string): Promise<void> {

        // Convert the book ID from string to ObjectId
        const objectId = new mongoose.Types.ObjectId(bookId);

        // Find the loan and update the return date for the specific book
        const loan = await LoanModel.findOneAndUpdate(
            { loanID, 'loanedBooks.book': objectId, 'loanedBooks.actualReturnDate': null }, // Match book not yet returned
            { $set: { 'loanedBooks.$.actualReturnDate': new Date() } }, // Set the return date to now
            { new: true }
        );

        if (!loan) {
            throw new Error(`Loan not found for ID ${loanID} or book with ID ${bookId} was already returned.`);
        }
    }

    async getAllLoans(): Promise<ILoan[]> {
        return await LoanModel.find().populate('loanedBooks.book').exec();
    }
}
