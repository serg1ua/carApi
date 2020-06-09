import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateManufacturerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiPropertyOptional()
  @IsString()
  public phone: string | null;

  @ApiPropertyOptional()
  @IsNumber()
  public siret: number | null;
}
