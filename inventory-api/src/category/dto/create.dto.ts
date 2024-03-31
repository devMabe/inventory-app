import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  storeId: number;
}
