import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateGenreDto } from './dto/create-genre.ts';
import { UpdateGenreDto } from './dto/update-genre.ts';

@Injectable()
export class GenresService {

  constructor(private prisma: PrismaService) {}

  // CREATE GENRE
  async create(createGenreDto: CreateGenreDto) {

    try {
      return await this.prisma.genre.create({
        data: createGenreDto,
      });

    } catch (error) {

      if (error.code === 'P2002') {
        throw new ConflictException('Genre already exists');
      }

      throw error;
    }
  }

  // FIND ALL GENRES
  async findAll() {

    return this.prisma.genre.findMany({
      include: {
        books: true,
      },
    });

  }

  // FIND ONE GENRE
  async findOne(id: string) {

    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: {
        books: true,
      },
    });

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }

    return genre;
  }

  // UPDATE GENRE
  async update(id: string, updateGenreDto: UpdateGenreDto) {

    await this.findOne(id);

    try {

      return await this.prisma.genre.update({
        where: { id },
        data: updateGenreDto,
      });

    } catch (error) {

      if (error.code === 'P2002') {
        throw new ConflictException('Genre name already exists');
      }

      throw error;
    }
  }

  // DELETE GENRE
  async remove(id: string) {

    await this.findOne(id);

    try {

      return await this.prisma.genre.delete({
        where: { id },
      });

    } catch (error) {

      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Cannot delete a genre that contains books',
        );
      }

      throw error;
    }
  }

}