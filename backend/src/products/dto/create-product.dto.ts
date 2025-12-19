import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Pearl Necklace',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'A beautiful handmade pearl necklace.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '49.50',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    example: '10',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @ApiProperty({
    example: 2,
  })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  categoryId: number;
}
