import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {

  constructor(private prisma: PrismaService) {}

  // CREATE BOOK
  async create(createBookDto: CreateBookDto) {

    try {

      return await this.prisma.book.create({
        data: createBookDto,
        include: {
          genre: true,
        },
      });

    } catch (error) {

      if (error.code === 'P2002') {
        throw new ConflictException('ISBN already exists');
      }

      if (error.code === 'P2003') {
        throw new NotFoundException('Genre does not exist');
      }

      throw error;
    }
  }

  // FIND ALL BOOKS WITH SEARCH, FILTER AND PAGINATION
  async findAll(
    genreId?: string,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ) {

    const where: any = {};

    // FILTER BY GENRE
    if (genreId) {
      where.genreId = genreId;
    }

    // SEARCH BY TITLE, AUTHOR OR ISBN
    if (search) {

      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          author: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          isbn: {
            contains: search,
          },
        },
      ];

    }

    // PAGINATION
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([

      this.prisma.book.findMany({
        where,
        skip,
        take: limit,
        include: {
          genre: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.book.count({
        where,
      }),

    ]);

    return {

      data: books,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },

    };
  }

  // FIND ONE BOOK
  async findOne(id: string) {

    const book = await this.prisma.book.findUnique({

      where: { id },

      include: {
        genre: true,
      },

    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  // UPDATE BOOK
  async update(id: string, updateBookDto: UpdateBookDto) {

    await this.findOne(id);

    try {

      return await this.prisma.book.update({

        where: { id },

        data: updateBookDto,

        include: {
          genre: true,
        },

      });

    } catch (error) {

      if (error.code === 'P2002') {
        throw new ConflictException('ISBN already exists');
      }

      if (error.code === 'P2003') {
        throw new NotFoundException('Genre does not exist');
      }

      throw error;
    }
  }

  // DELETE BOOK
  async remove(id: string) {

    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });

  }

}