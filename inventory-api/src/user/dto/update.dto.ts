import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  firstName: string;
  @IsString()
  @IsOptional()
  lastName: string;
  @IsString()
  @IsOptional()
  @Length(10, 10)
  docNumber: string;
  @IsString()
  @IsOptional()
  docType: 'CC' | 'CE' | 'LICENCIA';
}
