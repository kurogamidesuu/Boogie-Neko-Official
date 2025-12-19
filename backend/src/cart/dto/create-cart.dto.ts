import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    example: 3,
  })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  productId: number;

  @ApiProperty({
    example: 3,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}
