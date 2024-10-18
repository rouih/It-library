import mongoose, { mongo } from "mongoose";
import { BookType, LoanBookType } from "./book.type";

export type UserType = {
    username: string;
    userId: string;
    role: UserRole
    loan?: mongoose.Types.ObjectId;
    token?: string
}

export enum UserRole {
    CUSTOMER = "customer",
    EMPLOYEE = "employee"
}
