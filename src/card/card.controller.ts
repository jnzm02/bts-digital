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
import { CardDto } from './dto';
import { CardService } from './card.service';

@Controller('card')
@ApiTags('Cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CardDto })
  @Post()
  create(
    @Body() dto: CardDto,
    @Param('user_id', new ParseIntPipe()) user_id: number,
  ) {
    return this.cardService.create(dto, user_id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CardDto })
  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number) {
    return this.cardService.get(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [CardDto] })
  @Get()
  getAll() {
    return this.cardService.getAll();
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: String })
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: CardDto) {
    return this.cardService.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CardDto })
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.cardService.delete(id);
  }
}
