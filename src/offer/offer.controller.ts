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

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: OfferDto })
  @Post()
  create(
    @Body() dto: OfferDto,
    @Param('card_id', new ParseIntPipe()) card_id: number,
  ) {
    return this.offerService.create(dto, card_id);
  }

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
