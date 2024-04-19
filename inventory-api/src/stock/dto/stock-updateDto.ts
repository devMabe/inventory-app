import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class StockUpdateDto {
  @IsOptional()
  id?: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
