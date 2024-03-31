import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @Length(10, 10)
  phoneNumber: string;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
