import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
  ParseUUIDPipe,
} from '@nestjs/common';

import { BooksService } from './books.service';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('books')
export class BooksController {

  constructor(private readonly booksService: BooksService) {}

  // CREATE BOOK
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  create(@Body() createBookDto: CreateBookDto) {

    return this.booksService.create(createBookDto);
  }

  // FIND ALL BOOKS
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(

    @Query('genreId') genreId?: string,

    @Query('search') search?: string,

    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page?: number,

    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit?: number,

  ) {

    if (page < 1 || limit < 1 || limit > 100) {
      throw new Error('Invalid pagination parameters');
    }

    return this.booksService.findAll(
      genreId,
      search,
      page,
      limit,
    );
  }

  // FIND ONE BOOK
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {

    return this.booksService.findOne(id);
  }

  // UPDATE BOOK
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {

    return this.booksService.update(id, updateBookDto);
  }

  // DELETE BOOK
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  remove(@Param('id', ParseUUIDPipe) id: string) {

    return this.booksService.remove(id);
  }

}