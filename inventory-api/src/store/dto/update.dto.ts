import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDto {
  id?: number;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  address: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @Length(10, 10)
  @IsOptional()
  phoneNumber: string;
}
