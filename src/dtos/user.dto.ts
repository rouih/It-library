export class createUserDto{
    username: string;
    password: string;
    role: 'Customer'| 'Employee'
}

export class UpdateUserDto{
    username?: string;
    password?: string;
    role?: 'Customer'| 'Employee'
}

export class UserDto{
    id:string;
    username:string;
    password:string;
    role:'Customer'| 'Employee'
    loanedBooks: string[];
}