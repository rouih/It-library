import mongoose, { Document, mongo, Schema } from "mongoose";
import { BookType } from "../types/book.type";
import { UserRole } from "../types/user.type";
import passportLocalMongoose from "passport-local-mongoose";

export interface IUser extends Document {
    username: string
    userId: string;
    role: UserRole
    loan: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    loan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }]
})

userSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel;