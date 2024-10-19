import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { BookDto } from './book.dto';

export class CreateLoanDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @IsNotEmpty()
    bookIds: string[];
}

export class ReturnBookDto {
    @IsString()
    @IsNotEmpty()
    loanId: string;
    bookId: string;
}

export class ReturnBookDtoResponse {
    @IsString()
    @IsNotEmpty()
    bookId: string;
    message: string;
}

export class GetLoanByIdDto {
    @IsString()
    @IsNotEmpty()
    loanId: string;
}

export class LoanResponseDto {
    loanId!: string;
    books: BookDto[];
}

export class GetAllLoansDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @IsNotEmpty()
    loans: LoanResponseDto[];
}