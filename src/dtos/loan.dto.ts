export interface CreateLoanBookDto {
    userId: string;
    bookTitle: string;
    loanDate: Date;
    returnDate: Date;
}

export interface ReturnBookDto {
    userId: string;
    bookId: string;
    returnDate: Date;
}

export interface ILoan {
    userId: string;
    bookId: string;
    loanDate: Date;
    returnDate: Date;
}