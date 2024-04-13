import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiForbiddenResponse,
} from '@nestjs/swagger/dist';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200, type: UserDto || String })
  @Post('register')
  register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiForbiddenResponse({ description: 'Incorrect password.' })
  @ApiResponse({ status: 200, type: String })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'validate' })
  @ApiResponse({ status: 200, type: String })
  @Post('validate')
  validate(@Body() dto: { token: string }) {
    return this.authService.validate(dto);
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }
}
