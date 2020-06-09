import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateManufacturerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public siret: number;
}
