import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateLoanDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @IsNotEmpty()
    bookIds: string[];
}

export class ReturnLoanDto {
    @IsString()
    @IsNotEmpty()
    loanId: string;
    bookId: string;
}

export class LoanResponseDto {
    loanId!: string;
    bookIds: string[];
}