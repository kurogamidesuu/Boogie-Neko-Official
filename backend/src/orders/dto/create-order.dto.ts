import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Nya Nya Apartment, Neko Land, Tokyo, Japan',
    description: 'The address where the products are shipped to',
  })
  @IsString()
  @IsNotEmpty()
  shippingAddress: string;
}
