import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { GenresService } from './genres.service';

import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('genres')
export class GenresController {

  constructor(private readonly genresService: GenresService) {}

  // CREATE
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  create(@Body() createGenreDto: CreateGenreDto) {

    return this.genresService.create(createGenreDto);
  }

  // FIND ALL
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {

    return this.genresService.findAll();
  }

  // FIND ONE
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {

    return this.genresService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {

    return this.genresService.update(id, updateGenreDto);
  }

  // DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  remove(@Param('id') id: string) {

    return this.genresService.remove(id);
  }

}