import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class SearchBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsInt()
  @Min(1000)
  year?: number;
}

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsInt()
  @Min(1000)
  year!: number;

  @IsString()
  @IsNotEmpty()
  topic!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number; // rating between 1 to 5 to determine loan period

  @IsBoolean()
  available?: boolean;
}

export class CreateBookDtoResponse {
  @IsString()
  @IsNotEmpty()
  id!: string;
}

export class DeleteBookDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}

export class DeleteBookDtoResponse {
  @IsString()
  @IsNotEmpty()
  id!: string;
  message!: string;
}

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsInt()
  @Min(1000)
  year?: number;

  @IsString()
  @IsNotEmpty()
  topic?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number; // rating between 1 to 5 to determine loan period

  @IsBoolean()
  available?: boolean;
}

export class UpdateBookDtoResponse {
  @IsString()
  @IsNotEmpty()
  id!: string;
  message!: string;
}

export class BookDto {

  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsInt()
  @Min(1000)
  year!: number;

  @IsString()
  @IsNotEmpty()
  topic!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number; // rating between 1 to 5 to determine loan period

  @IsBoolean()
  available!: boolean;
}
