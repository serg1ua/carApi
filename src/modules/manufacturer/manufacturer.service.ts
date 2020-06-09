import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  // create manufacturer if not exist
  public async createManufacturer(name: string): Promise<Manufacturer> {
    // check if manufacturer exist
    let result: Manufacturer = await this.manufacturerRepository.findOne({
      name,
    });
    if (!result) {
      // create new manufacturer
      const dto: CreateManufacturerDto = { name, phone: null, siret: null };
      const manufacturer = this.manufacturerRepository.create(dto);
      try {
        result = await this.manufacturerRepository.save(manufacturer);
      } catch (err) {
        throw new InternalServerErrorException(
          err,
          'Something went wrong, while creating manufacturer',
        );
      }
    }
    return result;
  }

  public async updateManufacturer(
    id: number,
    dto: UpdateManufacturerDto,
  ): Promise<Manufacturer> {
    let result = null;
    try {
      result = await this.manufacturerRepository.update(id, dto);
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        'Something went wrong, while fetching manufacturer',
      );
    }
    if (!result.affected)
      throw new NotFoundException('Manufacturer is not found');
    return result;
  }
}
