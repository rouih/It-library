import { IsString, IsEmail, IsOptional, MinLength, IsNotEmpty, IsEnum, IsIdentityCard, isNotEmpty } from "class-validator";
import { UserRole } from "../types/user.type";
import { BookDto } from "./book.dto";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long',
    })
    @IsOptional()
    password?: string;

    @IsOptional()
    role?: UserRole;
}

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}

export class CreateUserDto {

    @IsString()
    @IsNotEmpty({ message: 'username is requiered' })
    username!: string

    @IsString()
    @IsNotEmpty({ message: 'id is requiered' })
    userId!: string;

    @IsString()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long',
    })
    @IsNotEmpty({ message: 'Password is required' })
    password!: string;

    @IsEnum(UserRole, {
        message: 'Role must be either "customer" or "employee"',
    })
    @IsNotEmpty({ message: 'Role is required' })
    role!: UserRole;
}

export class CreateUserResponseDto {
    @IsString()
    @IsNotEmpty({ message: 'id is requiered' })
    userId!: string;
    token?: string;
    constructor(partial: Partial<CreateUserResponseDto>) {
        Object.assign(this, partial);
    }
}

export class UserResponseDto {
    @IsString()
    @IsNotEmpty({ message: 'id is requiered' })
    userId!: string;
    role!: UserRole;
    createdAt!: Date;
    updatedAt!: Date;
    loanedBooks: BookDto[];
    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}