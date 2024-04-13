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
import { CategoryDto } from './dto';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('Categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CategoryDto })
  @Post()
  create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CategoryDto })
  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoryService.get(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [CategoryDto] })
  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: String })
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: CategoryDto,
  ) {
    return this.categoryService.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CategoryDto })
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoryService.delete(id);
  }
}
