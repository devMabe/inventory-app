import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() params: AuthDto) {
    return await this.authService.login(params);
  }
  @Post('/refresh-token')
  async refreshToken(@Body() data: { token: string }) {
    return await this.authService.refreshToken(data.token);
  }
}
