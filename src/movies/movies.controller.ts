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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `This will return One movie id: ${movieId}`;
  }

  @Post()
  create(@Body() movieDate) {
    return movieDate;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateDate) {
    return {
      updatedMovie: movieId,
      ...updateDate,
    };
  }

  @Delete('/:id')
  delete(@Param('id') movieId: string) {
    return `This will delete movie id: ${movieId}`;
  }
}
