import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ItemUpdateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
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
  @IsOptional()
  @IsNumber()
  price: number;
}
