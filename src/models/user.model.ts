import mongoose, { Document, Schema } from "mongoose";
import { BookType } from "../types/book.type";
import { UserRole } from "../types/user.type";
const passportLocalMongoose = require('passport-local-mongoose');

export interface IUser extends Document {
    username: string
    userId: string;
    password: string;
    role: UserRole
    loanedBooks: BookType[];
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique:true},
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    loanedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

userSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel;