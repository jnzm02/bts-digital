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

  // async create(dto: OfferDto, bank_id: number) {
  //   return await this.prisma.offer.create({
  //     data: {
  //       ...dto,
  //       bank_id,
  //     },
  //   });
  // }

  async update(id: number, dto: OfferDto) {
    const offer = await this.prisma.offer.findFirst({
      where: {
        id,
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

  async getOffersByCategory(user_id: number, category_id: number) {
    const cards = await this.prisma.card.findMany({
      where: {
        user_id,
      },
    });
    const category = await this.prisma.category.findFirst({
      where: {
        id: category_id,
      },
    });
    const bank_ids = cards.map((card) => card.bank_id);
    const offers = await this.prisma.offer.findMany({
      where: {
        bank_id: {
          in: bank_ids,
        },
        card_type: {
          in: cards.map((card) => card.card_type),
        },
        category: category.name,
      },
      include: {
        Bank: true,
      },
    });
    return offers;
  }

  async getOffersByCard(user_id: number) {
    const cards = await this.prisma.card.findMany({
      where: {
        user_id,
      },
    });
    const bank_ids = cards.map((card) => card.bank_id);
    const offers = await this.prisma.offer.findMany({
      where: {
        bank_id: {
          in: bank_ids,
        },
        card_type: {
          in: cards.map((card) => card.card_type),
        },
      },
      include: {
        Bank: true,
      },
    });
    return offers;
  }

  async getSuggestedOffers(category_id: number, user_id: number) {
    const category = await this.prisma.category.findFirst({
      where: {
        id: category_id,
      },
    });
    const offers = await this.prisma.offer.findMany({
      where: {
        category: category.name,
      },
      include: {
        Bank: true,
      },
    });
    const cards = await this.prisma.card.findMany({
      where: {
        user_id,
      },
    });
    const suggestedOffers = offers.filter((offer) => {
      if (
        cards.some(
          (card) =>
            card.bank_id !== offer.bank_id ||
            card.card_type !== offer.card_type,
        )
      ) {
        return true;
      }
    });
    suggestedOffers.sort((a, b) => b.cashback - a.cashback);
    return suggestedOffers.slice(0, 2);
  }
}
