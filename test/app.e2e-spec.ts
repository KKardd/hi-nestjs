import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // 실제 서버의 구동되는 app과 설정을 꼭 맞춰줘야함.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // 이 코드를 지웠을땐 e2e test가 원활하게 작동되지 않음. 왜why? param의 타입을 제대로 가져오지 못하기 때문.
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome my movies API');
  });

  describe('/movies', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()) //
        .get('/movies')
        .expect(200)
        .expect('[]');
    });

    it('POST 201', () => {
      return request(app.getHttpServer()) //
        .post('/movies')
        .send({
          title: 'Test1',
          year: 2000,
          genres: ['test genres1'],
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer()) //
        .post('/movies')
        .send({
          title: 'Test1',
          year: 2000,
          genres: ['test genres1'],
          error: 'ERROR!', //wrong thing
        })
        .expect(400);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()) //
        .get('/movies/1')
        .expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()) //
        .get('/movies/999')
        .expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer()) //
        .patch('/movies/1')
        .send({ title: 'Updated!' })
        .expect(200);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()) //
        .delete('/movies/1')
        .expect(200);
    });
  });
});
