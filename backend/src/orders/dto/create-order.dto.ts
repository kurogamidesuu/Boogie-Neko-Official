import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The Id of address where the products are shipped to',
  })
  @IsNotEmpty()
  @IsInt()
  shippingAddressId: number;
}
