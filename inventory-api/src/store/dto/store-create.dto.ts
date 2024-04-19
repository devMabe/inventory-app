import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class StoreCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;
  @ApiProperty()
  @IsString()
  @Length(10, 10)
  phoneNumber: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
