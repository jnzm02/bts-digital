import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async register(dto: UserDto) {
    return this.userService.create(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: dto.emailOrPhone,
          },
          {
            phone: dto.emailOrPhone,
          },
        ],
      },
    });
    if (!user) throw new NotFoundException('Email not found!');

    const passwordMatch = await argon.verify(user.password, dto.password);
    if (!passwordMatch) throw new ForbiddenException('Incorrect Password!');

    return await this.signToken({
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  }

  logout() {
    return;
  }

  async signToken(tokenData: any): Promise<any> {
    const token = await this.jwt.signAsync(tokenData, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });
    return { Access_Token: token };
  }

  async validate(dto: { token: string }) {
    const token = dto.token;
    try {
      const data = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      if (!data) throw new ForbiddenException('Invalid token');
      return data;
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}
