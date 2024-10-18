import mongoose, { Document, Schema, Types } from 'mongoose';
import { IBook } from './book.model';
import { IUser } from './user.model';


interface LoanedBook {
  book: Types.ObjectId; // Reference to the Book model
  loanDate: Date;
  returnDate: Date | null;
  actualReturnDate: Date | null;
}


export interface ILoan extends Document {
  loanID: string;
  userID: string; // Reference to the User model
  loanedBooks: LoanedBook[];
}

const loanedBookSchema = new Schema<LoanedBook>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  loanDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: null },
  actualReturnDate: { type: Date, default: null }
});

const loanSchema = new Schema<ILoan>({
  loanID: { type: String, required: true, unique: true },
  userID: { type: String, ref: 'User', required: true },
  loanedBooks: [loanedBookSchema],
});


const LoanModel = mongoose.model<ILoan>('Loan', loanSchema);
export default LoanModel;