import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieDate: CreateMovieDto) {
    return this.moviesService.create(movieDate);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateDate: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateDate);
  }

  @Delete('/:id')
  delete(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }
}
