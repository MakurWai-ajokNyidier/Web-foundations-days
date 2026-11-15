import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';

import { Role } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(

    private prisma: PrismaService,

    private jwtService: JwtService,

  ) {}

  // REGISTER USER
  async register(registerDto: RegisterDto) {

    const existingUser = await this.prisma.user.findUnique({

      where: {
        email: registerDto.email,
      },

    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      10,
    );

    // CREATE USER
    const user = await this.prisma.user.create({

      data: {

        email: registerDto.email,

        password: hashedPassword,

        // Public registration always creates a PATRON.
        role: Role.PATRON,

      },

      select: {

        id: true,
        email: true,
        role: true,
        createdAt: true,

      },

    });

    return {

      message: 'Registration successful',

      user,

    };
  }

  // LOGIN USER
  async login(loginDto: LoginDto) {

    const user = await this.prisma.user.findUnique({

      where: {
        email: loginDto.email,
      },

    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // COMPARE PASSWORD
    const passwordMatch = await bcrypt.compare(

      loginDto.password,

      user.password,

    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // GENERATE JWT
    const payload = {

      sub: user.id,

      email: user.email,

      role: user.role,

    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {

      message: 'Login successful',

      access_token: accessToken,

      user: {

        id: user.id,

        email: user.email,

        role: user.role,

      },

    };
  }

}