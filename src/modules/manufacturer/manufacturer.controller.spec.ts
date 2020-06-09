import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';
import { Manufacturer } from './manufacturer.entity';

describe('Manufacturer Controller Test', () => {
  let manufacturerController: ManufacturerController;
  let manufacturerService: ManufacturerService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturerController],
      providers: [
        {
          provide: ManufacturerService,
          useValue: {
            updateManufacturer: jest.fn(),
          },
        },
      ],
    }).compile();

    manufacturerService = moduleRef.get<ManufacturerService>(
      ManufacturerService,
    );
    manufacturerController = moduleRef.get<ManufacturerController>(
      ManufacturerController,
    );
  });

  it('should be defined', () => {
    expect(manufacturerService).toBeDefined();
    expect(manufacturerController).toBeDefined();
  });

  it('should update a manufacturer', async () => {
    const result = {} as Manufacturer;
    jest
      .spyOn(manufacturerService, 'updateManufacturer')
      .mockImplementation(() => Promise.resolve(result));

    expect(
      await manufacturerService.updateManufacturer(1, {
        phone: '1 (800) xxx xx xx',
        siret: 123,
      }),
    ).toBe(result);
  });
});
