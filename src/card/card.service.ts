import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardDto } from './dto';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.card.findMany({});
  }

  async get(id: number) {
    return await this.prisma.card.findFirst({
      where: {
        id: id,
      },
    });
  }

  async create(dto: CardDto, user_id: number) {
    return await this.prisma.card.create({
      data: {
        ...dto,
        user_id,
      },
    });
  }

  async update(id: number, dto: CardDto) {
    const card = await this.prisma.card.findFirst({
      where: {
        id: id,
      },
    });
    if (!card) {
      throw new NotFoundException('Card with id: ' + id + ' not found');
    }
    await this.prisma.card.update({
      data: {
        ...dto,
      },
      where: {
        id: id,
      },
    });
  }
  async delete(id: number) {
    const card = await this.prisma.card.delete({
      where: {
        id,
      },
    });
    if (!card) {
      throw new NotFoundException('User with id: ' + id + ' not found');
    }
    return card;
  }
}
