import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.category.findMany({});
  }

  async get(id: number) {
    return await this.prisma.category.findFirst({
      where: {
        id: id,
      },
    });
  }

  async create(dto: CategoryDto) {
    return await this.prisma.category.create({
      data: {
        ...dto,
      },
    });
  }

  async update(id: number, dto: CategoryDto) {
    const card = await this.prisma.category.findFirst({
      where: {
        id: id,
      },
    });
    if (!card) {
      throw new NotFoundException('Card with id: ' + id + ' not found');
    }
    await this.prisma.category.update({
      data: {
        ...dto,
      },
      where: {
        id: id,
      },
    });
  }

  async delete(id: number) {
    const card = await this.prisma.category.delete({
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
