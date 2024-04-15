import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  image?: string;
  @IsOptional()
  @IsNumber()
  categoryId?: number;
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
