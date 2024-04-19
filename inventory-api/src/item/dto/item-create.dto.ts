import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ItemCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  categoryId?: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
