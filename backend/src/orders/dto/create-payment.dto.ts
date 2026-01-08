import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The id of order that this payment belongs to',
  })
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @ApiProperty({
    description: 'Transaction ID of the payment for the order',
    example: '112233445566',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{12}$/, {
    message: 'Transaction ID must be exactly 12 digits',
  })
  transactionId: string;
}
