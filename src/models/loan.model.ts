import mongoose, { Document, Schema } from 'mongoose';

export interface ILoan extends Document {
  user: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  loanDate: Date;
  returnDate: Date;
}

const LoanSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Types.ObjectId, ref: 'Book', required: true },
  loanDate: { type: Date, default: Date.now },
  returnDate: { type: Date, required: true }
});

const LoanModel = mongoose.model<ILoan>('Loan', LoanSchema);
export default LoanModel;