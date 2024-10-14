import mongoose, { Document, Schema } from "mongoose";
import { BookType } from "src/types/book.type";
import { UserRole } from "src/types/user.type";
const passportLocalMongoose = require('passport-local-mongoose');

export interface IUser extends Document {
    userId: string;
    password: string;
    role: UserRole
    loanedBooks: BookType[];
}

const userSchema = new Schema<IUser>({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    loanedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

userSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel;