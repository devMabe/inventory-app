import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  docNumber: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  docType: 'CC' | 'CE' | 'LICENCIA';
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
