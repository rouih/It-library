import { BookType } from "./book.type";

export type UserType = {
    userId: string;
    password: string;
    role: UserRole
    loanedBooks: BookType[];
    token?: string
}

export enum UserRole {
    CUSTOMER = "customer",
    EMPLOYEE = "employee"
}
