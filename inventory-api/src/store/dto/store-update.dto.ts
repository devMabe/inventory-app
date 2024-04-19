import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class StoreUpdateDto {
  id?: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;
  @IsEmail()
  @ApiProperty()
  @IsOptional()
  email?: string;
  @ApiProperty()
  @IsString()
  @Length(10, 10)
  @IsOptional()
  phoneNumber: string;
}
