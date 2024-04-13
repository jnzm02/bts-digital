import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaMixin {
  constructor(private prisma: PrismaService) {}

  async findOne<T>(model: string, where: any): Promise<T | null> {
    return this.prisma[model].findFirst({ where });
  }

  async findMany<T>(model: string, where: any): Promise<T[]> {
    return this.prisma[model].findMany({ where });
  }

  async create<T>(model: string, data: any): Promise<T> {
    return this.prisma[model].create({ data });
  }

  async removeOne<T>(model: string, where: any): Promise<T> {
    return this.prisma[model].delete({ where });
  }

  async removeMany<T>(model: string, where: any): Promise<T> {
    return this.prisma[model].deleteMany({ where });
  }

  async update<T>(model: string, where: any, data: any): Promise<T> {
    return this.prisma[model].update({ where, data });
  }
}
