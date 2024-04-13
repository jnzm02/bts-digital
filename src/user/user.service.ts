import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserChangePasswordDto, UserDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async getAll() {
    return await this.prisma.user.findMany({});
  }

  async get(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user)
      throw new NotFoundException('User with id: ' + id + ' not found');
    return user;
  }

  async create(dto: UserDto) {
    const password = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
          firstname: dto.firstname,
          lastname: dto.lastname,
          phone: dto.phone,
          address: dto.address,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException(
            'Email already exists, take another one!',
          );
      }
      throw error;
    }
  }

  async changePassword(id: number, dto: UserChangePasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user)
      throw new NotFoundException('User with id: ' + id + ' not found');
    const oldPasswordMatch = await argon.verify(user.password, dto.oldPassword);
    if (!oldPasswordMatch)
      throw new ForbiddenException('Old password does not match');
    const newPassword = await argon.hash(dto.newPassword);
    await this.prisma.user.update({
      data: {
        password: newPassword,
      },
      where: {
        id,
      },
    });
    return {
      message: 'Password successfully changed',
    };
  }
  async update(id: number, dto: UserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user)
      throw new NotFoundException('User with id: ' + id + ' not found');
    await this.prisma.user.update({
      data: {
        email: dto.email,
        firstname: dto.firstname,
        lastname: dto.lastname,
        phone: dto.phone,
      },
      where: {
        id: id,
      },
    });
    const tokenData = {
      id,
      email: dto.email,
      phone: dto.phone,
      firstname: dto.firstname,
      lastname: dto.lastname,
      address: dto.address,
    };
    const token = await this.jwt.signAsync(tokenData, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });
    return { Access_Token: token };
  }
  async delete(id: number) {
    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (!user)
      throw new NotFoundException('User with id: ' + id + ' not found');
    return user;
  }
}
