import { IsNotEmpty, IsString } from 'class-validator';
export class BankDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
