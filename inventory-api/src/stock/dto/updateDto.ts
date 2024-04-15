import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  id?: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
