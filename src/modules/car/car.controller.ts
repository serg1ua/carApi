import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './car.entity';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  public getCars(): Promise<Car[]> {
    return this.carService.getCars();
  }

  @Get(':id')
  public getCarById(@Param('id', new ParseIntPipe()) id: number): Promise<Car> {
    return this.carService.getCarById(id);
  }

  @Get(':id/manufacturer')
  public getCarManufacturer(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<any> {
    return this.carService.getCarManufacturer(id);
  }

  @Post('create')
  public createCar(@Body() dto: CreateCarDto): Promise<Car> {
    return this.carService.createCar(dto);
  }

  @Put(':id')
  public async updateCar(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateCarDto,
  ): Promise<Car> {
    return this.carService.updateCar(id, dto);
  }

  @Delete(':id')
  public deleteCar(@Param('id', new ParseIntPipe()) id: number): Promise<Car> {
    return this.carService.deleteCar(id);
  }
}
