import { BookType } from "./book.type";

export type UserType = {
    username: string;
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
