import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsUUID,
  IsISBN,
} from 'class-validator';

export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  @IsISBN()
  isbn: string;

  @IsInt()
  @Min(1)
  totalCopies: number;

  @IsUUID()
  @IsNotEmpty()
  genreId: string;

}