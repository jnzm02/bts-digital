import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OfferDto } from './dto';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.offer.findMany({});
  }

  async get(id: number) {
    return await this.prisma.offer.findFirst({
      where: {
        id: id,
      },
    });
  }

  async create(dto: OfferDto, card_id: number) {
    return await this.prisma.offer.create({
      data: {
        ...dto,
        card_id,
      },
    });
  }

  async update(id: number, dto: OfferDto) {
    const offer = await this.prisma.offer.findFirst({
      where: {
        id: id,
      },
    });
    if (!offer) {
      throw new NotFoundException('Offer with id: ' + id + ' not found');
    }
    await this.prisma.offer.update({
      data: {
        ...dto,
      },
      where: {
        id: id,
      },
    });
  }
  async delete(id: number) {
    const offer = await this.prisma.offer.delete({
      where: {
        id,
      },
    });
    if (!offer) {
      throw new NotFoundException('Offer with id: ' + id + ' not found');
    }
    return offer;
  }
}
