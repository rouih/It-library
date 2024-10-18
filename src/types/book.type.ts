export type BookType = {
    title: string;
    author: string;
    year: number;
    topic: string;
    rating: number;
    available: boolean;
}


export type LoanBookType = {
    bookId: string;
    returnDate: Date;
    actualReturnDate?: Date;
}