import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsBoolean,
} from "class-validator";

export class BookDTO {
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
