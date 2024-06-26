import { IsNotEmpty, IsString } from 'class-validator';
export class CardDto {
  @IsString()
  @IsNotEmpty()
  card_type: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  expiry: string;
}
