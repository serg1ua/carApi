import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { Car } from './car.entity';

describe('Car Controller Test', () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        {
          provide: CarService,
          useValue: {
            getCars: jest.fn(),
            createCar: jest.fn(),
            updateCar: jest.fn(),
            getCarById: jest.fn(),
            getCarManufacturer: jest.fn(),
            deleteCar: jest.fn(),
          },
        },
        { provide: ManufacturerService, useValue: {} },
      ],
    }).compile();

    carService = moduleRef.get<CarService>(CarService);
    carController = moduleRef.get<CarController>(CarController);
  });

  it('should be defined', () => {
    expect(carController).toBeDefined();
    expect(carService).toBeDefined();
  });

  it('should return all cars', async () => {
    const result = [] as Car[];
    jest
      .spyOn(carService, 'getCars')
      .mockImplementation(() => Promise.resolve(result));

    expect(await carController.getCars()).toBe(result);
  });

  it('should return a car', async () => {
    const result = {} as Car;
    jest
      .spyOn(carService, 'getCarById')
      .mockImplementation(() => Promise.resolve(result));

    expect(await carController.getCarById(1)).toBe(result);
  });

  it('should return a car manufacturer', async () => {
    const result = {} as any;
    jest
      .spyOn(carService, 'getCarManufacturer')
      .mockImplementation(() => Promise.resolve(result));

    expect(await carController.getCarManufacturer(1)).toBe(result);
  });

  it('should create a car', async () => {
    const result = {} as Car;
    jest
      .spyOn(carService, 'createCar')
      .mockImplementation(() => Promise.resolve(result));

    expect(
      await carController.createCar({
        manufacturerName: 'Ford',
        price: 1200,
      }),
    ).toBe(result);
  });

  it('should update a car', async () => {
    const result = {} as Car;
    jest
      .spyOn(carService, 'updateCar')
      .mockImplementation(() => Promise.resolve(result));

    expect(await carController.updateCar(1, { price: 1000 })).toBe(result);
  });

  it('should delete a car', async () => {
    const result = {} as Car;
    jest
      .spyOn(carService, 'deleteCar')
      .mockImplementation(() => Promise.resolve(result));

    expect(await carController.deleteCar(1)).toBe(result);
  });
});
