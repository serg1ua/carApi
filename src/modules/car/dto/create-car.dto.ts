import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public manufacturerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public price: number;
}
