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
import { BankDto } from './dto';
import { BankService } from './bank.service';

@Controller('bank')
@ApiTags('Bank')
export class BankController {
  constructor(private bankService: BankService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: BankDto })
  @Post()
  create(@Body() dto: BankDto) {
    return this.bankService.create(dto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: BankDto })
  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number) {
    return this.bankService.get(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [BankDto] })
  @Get()
  getAll() {
    return this.bankService.getAll();
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: String })
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: BankDto) {
    return this.bankService.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: BankDto })
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.bankService.delete(id);
  }
}
