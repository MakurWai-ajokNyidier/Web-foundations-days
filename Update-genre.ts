import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.ts';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {}