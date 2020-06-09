import { Controller, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManufacturerService } from './manufacturer.service';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';

@ApiTags('Manufacturer')
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private manufacturersService: ManufacturerService) {}

  @Put(':id')
  public updateManufacturer(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateManufacturerDto,
  ): Promise<Manufacturer> {
    return this.manufacturersService.updateManufacturer(id, dto);
  }
}
