import { IsNotEmpty, IsString } from 'class-validator';
export class OfferDto {
  @IsString()
  @IsNotEmpty()
  cashback: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsString()
  @IsNotEmpty()
  expiry: string;

  @IsString()
  @IsNotEmpty()
  restrictions: string;
}
