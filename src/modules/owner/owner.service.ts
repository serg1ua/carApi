import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Owner } from './owner.entity';
import { Car } from '../car/car.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { CarService } from '../car/car.service';
import config from '../../config';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    private readonly carService: CarService,
  ) {}

  public async createOwner(dto: CreateOwnerDto): Promise<Owner> {
    // check if car exist, if not throws an error
    const carId: number = dto.carId;
    const car: Car = await this.carService.getCarById(carId);
    // if car exist create a new owner
    const newOwner = Object.assign(
      { car },
      { name: dto.name, purchaseDate: Date.now() },
    );
    let result = null;
    const owner: Owner = this.ownerRepository.create(newOwner);
    try {
      result = await this.ownerRepository.save(owner);
    } catch (err) {
      throw new InternalServerErrorException(err, 'Error creating new owner');
    }
    return result;
  }

  public async removeOwners(): Promise<Owner[]> {
    const endMonth: number = parseInt(config.END_MONTH, 10);
    const oneMonth: number = config.ONE_MONTH;
    let owners: Owner[];
    // find owners that made purchase over 18 months ago
    try {
      owners = await this.ownerRepository.find({
        purchaseDate: LessThan(Date.now() - oneMonth * endMonth),
      });
      // bulk delete owners if found
      if (owners.length) {
        owners = await this.ownerRepository.remove(owners);
      }
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        'An error occurred while deleting users',
      );
    }
    return owners;
  }
}
