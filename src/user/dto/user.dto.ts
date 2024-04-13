import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
export class UserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'Почтовый адрес' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456789', description: 'Пароль юзера' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Kairat', description: 'Имя юзера' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Nurtas', description: 'Фамилия юзера' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: '+77775355025', description: 'Номер юзера' })
  @IsPhoneNumber('KZ')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Kabanbay Batyr', description: 'Адрес юзера' })
  @IsString()
  @IsNotEmpty()
  address: string;
}

export class UserChangePasswordDto {
  @ApiProperty({ example: '123456789', description: 'Старый пароль юзера' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: '123456789', description: 'Новый пароль юзера' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
