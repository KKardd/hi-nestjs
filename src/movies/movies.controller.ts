import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `This will return One movie id: ${movieId}`;
  }

  @Post()
  create() {
    return 'This will create movies';
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `This will update movie id: ${movieId}`;
  }

  @Delete('/:id')
  delete(@Param('id') movieId: string) {
    return `This will delete movie id: ${movieId}`;
  }
}
