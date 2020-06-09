import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOwnerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public carId: number;
}
