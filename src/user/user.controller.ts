import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserChangePasswordDto, UserDto } from './dto';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { CardDto } from 'src/card/dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание юзера' })
  @ApiResponse({ status: 200, type: UserDto })
  @Post()
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: UserDto })
  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.get(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: CardDto })
  @Get('my-cards/:user_id')
  getMyCards(@Param('user_id', new ParseIntPipe()) user_id: number) {
    return this.userService.getMyCards(user_id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Список всех юзеров' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменения юзера' })
  @ApiResponse({ status: 200, type: String })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(+id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменения пароля юзера' })
  @ApiResponse({ status: 200 })
  @Patch(':id')
  changePassword(@Param('id') id: string, @Body() dto: UserChangePasswordDto) {
    return this.userService.changePassword(+id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление юзера' })
  @ApiResponse({ status: 200, type: UserDto })
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.delete(id);
  }
}
