export type UserType = {
    id:string;
    username:string;
    password:string;
    role:'Customer'| 'Employee'
    loanedBooks: string[];
}