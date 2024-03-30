import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  docNumber: string;
  @IsString()
  @IsNotEmpty()
  docType: 'CC' | 'CE' | 'LICENCIA';
  @IsString()
  @IsNotEmpty()
  password: string;
}
