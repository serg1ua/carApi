import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Manufacturer } from '../src/modules/manufacturer/manufacturer.entity';
import { Car } from '../src/modules/car/car.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let carRepository: Repository<Car>;
  let manufacturerRepository: Repository<Manufacturer>;
  let car: Car;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    carRepository = moduleFixture.get<Repository<Car>>('CarRepository');
    manufacturerRepository = moduleFixture.get<Repository<Manufacturer>>('ManufacturerRepository');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  })

  it('/car/create (POST)', async () => {
    const carCreate = {
      manufacturerName: 'Ford',
      price: 1000,
    };

    const { body } = await request(app.getHttpServer())
      .post('/car/create')
      .send(carCreate)
      .expect(201);
    car = body;
    expect(body).toEqual({
      id: expect.any(Number),
      price: expect.any(Number),
      firstRegistrationDate: expect.any(Number),
      manufacturer: expect.any(Object),
    });
  });

  it('/car (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/car')
      .expect(200);
    expect(body).toBeInstanceOf(Array);
    car = body[0];
    for (const car of body) {
      expect(car).toEqual({
        id: expect.any(Number),
        price: expect.any(Number),
        firstRegistrationDate: expect.any(String),
        owners: expect.any(Array)
      });
    }
  });

  it('/car/:id (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/car/${car.id}`)
      .expect(200);
    expect(body).toEqual({
      id: expect.any(Number),
      price: expect.any(Number),
      firstRegistrationDate: expect.any(String),
      owners: expect.any(Array)
    });
  });

  it('/car/:id/manufacturer (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/car/${car.id}/manufacturer`)
      .expect(200);
    expect(body).toBeInstanceOf(Object);
    const { id, manufacturer } = body;
    expect(id).toBeGreaterThan(0);
    expect(manufacturer).toBeInstanceOf(Object);
  });

  it('/car/:id (PUT)', async () => {
    const carUpdate = {
      price: 12000
    }
    const { body } = await request(app.getHttpServer())
      .put(`/car/${car.id}`)
      .send(carUpdate)
      .expect(200);
    expect(body).toEqual({
      affected: 1,
      generatedMaps: expect.any(Array),
      raw: expect.any(Array)
    });
  });

  it('/car/:id (DELETE)', async () => {
    const { body } = await request(app.getHttpServer())
      .delete(`/car/${car.id}`)
      .expect(200);
    expect(body).toEqual({
      affected: 1,
      raw: expect.any(Array)
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
