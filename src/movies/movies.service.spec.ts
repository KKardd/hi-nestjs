import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test1', 'test2'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('create movie', () => {
      const beforeLength = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test1', 'test2'],
        year: 2000,
      });
      const afterLength = service.getAll().length;
      expect(afterLength).toBeGreaterThan(beforeLength);
    });
  });

  describe('deleteOne', () => {
    it('should remove a moive', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test1', 'test2'],
        year: 2000,
      });
      const beforeLength = service.getAll().length;
      service.deleteOne(1);
      const afterLength = service.getAll().length;
      expect(afterLength).toBeLessThan(beforeLength);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test1', 'test2'],
        year: 2000,
      });
      service.update(1, { title: 'Updated!' });
      expect(service.getOne(1).title).toEqual('Updated!');
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
