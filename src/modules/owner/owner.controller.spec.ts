import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { Owner } from './owner.entity';

describe('Owner Controller Test', () => {
  // let ownerController: OwnerController;
  let ownerService: OwnerService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
      providers: [
        {
          provide: OwnerService,
          useValue: {
            createOwner: jest.fn(),
            deleteOwner: jest.fn(),
          },
        },
      ],
    }).compile();

    ownerService = moduleRef.get<OwnerService>(OwnerService);
    // ownerController = moduleRef.get<OwnerController>(OwnerController);
  });

  it('should be defined', () => {
    expect(OwnerService).toBeDefined();
    expect(OwnerController).toBeDefined();
  });

  it('should create new owner', async () => {
    const result = {} as Owner;
    jest
      .spyOn(ownerService, 'createOwner')
      .mockImplementation(() => Promise.resolve(result));

    expect(await ownerService.createOwner({ name: 'John Doe', carId: 1 })).toBe(
      result,
    );
  });
});
