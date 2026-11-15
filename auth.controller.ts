import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  // REGISTER
  @Post('register')
  register(@Body() registerDto: RegisterDto) {

    return this.authService.register(registerDto);
  }

  // LOGIN
  @Post('login')
  login(@Body() loginDto: LoginDto) {

    return this.authService.login(loginDto);
  }

}