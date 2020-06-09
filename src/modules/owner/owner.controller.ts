import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from './owner.entity';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Post()
  public createOwner(@Body() dto: CreateOwnerDto): Promise<Owner> {
    return this.ownerService.createOwner(dto);
  }
}
