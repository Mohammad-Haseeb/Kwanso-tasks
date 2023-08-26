import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const data = {
    email: 'mohammad@gmail.com',
    password: '2icEkc.1Wvjkdmvj',
  };

  it('should register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/register')
      .send(data)
      .expect(201);
    console.log('Res : ', response);
    expect(response.body.user.email).toEqual(data.email);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('email');
  });

  it('should return 400 with error message for duplicate email', async () => {
    const response = await request(app.getHttpServer())
      .post('/register')
      .send(data)
      .expect(400);
    expect(response.body).toEqual({
      statusCode: 400,
      message: 'email already exist',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
