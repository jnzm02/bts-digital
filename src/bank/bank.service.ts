import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BankDto } from './dto';

@Injectable()
export class BankService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.bank.findMany({});
  }

  async get(id: number) {
    return await this.prisma.bank.findFirst({
      where: {
        id: id,
      },
      include: {
        Cards: true,
      },
    });
  }

  async create(dto: BankDto) {
    return await this.prisma.bank.create({
      data: {
        ...dto,
      },
    });
  }

  async update(id: number, dto: BankDto) {
    const bank = await this.prisma.bank.findFirst({
      where: {
        id: id,
      },
    });
    if (!bank) {
      throw new NotFoundException('Bank with id: ' + id + ' not found');
    }
    await this.prisma.bank.update({
      data: {
        ...dto,
      },
      where: {
        id: id,
      },
    });
  }

  async delete(id: number) {
    const bank = await this.prisma.bank.delete({
      where: {
        id,
      },
    });
    if (!bank) {
      throw new NotFoundException('Bank with id: ' + id + ' not found');
    }
    return bank;
  }
}
