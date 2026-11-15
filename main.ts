import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';

import { BooksModule } from './books/books.module';

import { GenresModule } from './genres/genres.module';

@Module({

  imports: [

    ConfigModule.forRoot({

      isGlobal: true,

    }),

    PrismaModule,

    AuthModule,

    BooksModule,

    GenresModule,

  ],

})

export class AppModule {}