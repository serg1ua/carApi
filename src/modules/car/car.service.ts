import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly manufacturerService: ManufacturerService,
  ) {}

  // get all cars
  public async getCars(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  // get car
  public async getCarById(id: number): Promise<Car> {
    const car = await this.carRepository.findOne(id);
    if (!car) {
      throw new NotFoundException('This car does not exist');
    }
    return car;
  }

  // get carmanufacturer data
  public async getCarManufacturer(id: number): Promise<any> {
    const car = await this.carRepository.findOne(id, {
      select: ['id'],
      relations: ['manufacturer'],
      join: {
        alias: 'car',
        leftJoinAndSelect: {
          manufacturer: 'car.manufacturer',
        },
      },
    });
    if (!car) {
      throw new NotFoundException('This car does not exist');
    }
    return car;
  }

  // create a car
  public async createCar(dto: CreateCarDto): Promise<Car> {
    const { manufacturerName } = dto;
    // create manufacturer if not exist
    const manufacturer: Manufacturer = await this.manufacturerService.createManufacturer(
      manufacturerName,
    );
    // create a new car
    const newCar = Object.assign(
      { manufacturer },
      { price: dto.price, firstRegistrationDate: Date.now() },
    );
    const car: Car = this.carRepository.create(newCar);
    let result = null;
    try {
      result = await this.carRepository.save(car);
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        'Something went wrong, while creating a car',
      );
    }
    return result;
  }

  // update car
  public async updateCar(id: number, dto: UpdateCarDto): Promise<Car> {
    let result = null;
    try {
      result = await this.carRepository.update(id, dto);
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        'Something went wrong, while handling update',
      );
    }
    if (!result.affected) throw new NotFoundException('Car is not found');
    return result;
  }

  // delete the car
  public async deleteCar(id: number): Promise<any> {
    let result = null;
    try {
      result = await this.carRepository.delete(id);
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        'Something went wrong, while deleting a car',
      );
    }
    if (!result.affected)
      throw new NotFoundException(`This car does nor exist: ${id}`);
    return result;
  }
}
