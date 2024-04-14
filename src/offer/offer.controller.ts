import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OfferDto } from './dto';
import { OfferService } from './offer.service';

@Controller('offer')
@ApiTags('Offers')
export class OfferController {
  constructor(private offerService: OfferService) {}

  // @ApiBearerAuth()
  // @ApiResponse({ status: 201, type: OfferDto })
  // @Post(':bank_id')
  // create(
  //   @Body() dto: OfferDto,
  //   @Param('bank_id', new ParseIntPipe()) bank_id: number,
  // ) {
  //   return this.offerService.create(dto, bank_id);
  // }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: OfferDto })
  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number) {
    return this.offerService.get(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [OfferDto] })
  @Get()
  getAll() {
    return this.offerService.getAll();
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [OfferDto] })
  @Get('by-category/:user_id/:category_id')
  async getByCategory(
    @Param('user_id', new ParseIntPipe()) user_id: number,
    @Param('category_id', new ParseIntPipe()) category_id: number,
  ) {
    const myOffers = await this.offerService.getOffersByCategory(
      user_id,
      category_id,
    );
    const suggestedOffers = await this.offerService.getSuggestedOffers(
      user_id,
      category_id,
    );
    return { myOffers, suggestedOffers };
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [OfferDto] })
  @Get('by-card/:card_id')
  getByCard(@Param('card_id', new ParseIntPipe()) card_id: number) {
    return this.offerService.getOffersByCard(card_id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: String })
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: OfferDto) {
    return this.offerService.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: OfferDto })
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.offerService.delete(id);
  }
}
