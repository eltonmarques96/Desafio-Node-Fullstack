import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserController } from './user.controller';
import { INestApplication } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [],
    }).compile();
    app = moduleFixture.createNestApplication();

    userController = moduleFixture.get<UserController>(UserController);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it(`should create an user by http request`, async () => {
    const res = await request(app).post('/users').send({
      fullName: 'Elton Marques dos Santos',
      email: 'user1@example.com',
      password: '123456',
    });
    expect(res.statusCode).toBe(201);
  });

  // it('Should not be able to two or more user with the same email address', async () => {
  //   expect(userRepositoryInMemory.users).toEqual([]);
  //   const firstUser = await createUserUseCase.execute({
  //     email: 'email@email.com',
  //     fullName: 'Random Person Name',
  //     password: '123456',
  //   });
  //   const secondUser = await createUserUseCase.execute({
  //     email: 'email@email.com',
  //     fullName: 'Random Person Name',
  //     password: '123456',
  //   });
  //   expect(false).toEqual(true);
  // });
});
