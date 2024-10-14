import { IsString, IsEmail, IsOptional, MinLength, IsNotEmpty, IsEnum, IsIdentityCard } from "class-validator";
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
    role?: UserRole;  // Allow role update if necessary (for example, an admin might change a user's role)
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
    @IsNotEmpty({ message: 'id is required' })
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
    userId!: string;
    token?: string;
    constructor(partial: Partial<CreateUserResponseDto>) {
        Object.assign(this, partial);
    }
}

export class UserResponseDto {
    userId!: string;
    role!: UserRole;
    createdAt!: Date;
    updatedAt!: Date;
    loanedBooks: BookDto[];
    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}