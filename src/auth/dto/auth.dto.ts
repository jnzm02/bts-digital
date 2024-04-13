import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class LoginDto {
  @ApiProperty({
    example: 'user@mail.com or 87775355025',
    description: 'Почтовый адрес или телефон юзера',
  })
  @IsNotEmpty()
  emailOrPhone: string;

  @ApiProperty({ example: '123456789', description: 'Пароль юзера' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
