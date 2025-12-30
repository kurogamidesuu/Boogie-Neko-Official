import { ApiProperty } from '@nestjs/swagger';
import { AddressType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    example: 'Kairi Kumar',
    description: 'The full name of user',
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'The 10-digit phone number of customer (without +91)',
    example: '9876543210',
    pattern: '^[6-9]\\d{9}$',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp(/^[6-9]\d{9}$/), {
    message:
      'Phone number must be a valid 10-digit Indian mobile number starting with 6-9',
  })
  phone: string;

  @ApiProperty({
    description: '6-digit Indian Pincode',
    example: '110001',
    pattern: '^[1-9][0-9]{5}$',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp(/^[1-9][0-9]{5}$/), {
    message: 'Pincode must be exactly 6 digits and cannot start with 0',
  })
  pincode: string;

  @ApiProperty({
    example: 'New Delhi',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Delhi',
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Flat, House no., Building, Apartment',
    example: 'Flat 402, Sunshine Heights',
  })
  @IsNotEmpty()
  @IsString()
  houseNumber: string;

  @ApiProperty({
    description: 'Area, Street, Sector, Village',
    example: 'Sector 18, MG Road',
  })
  @IsNotEmpty()
  @IsString()
  area: string;

  @ApiProperty({
    description: 'Nearby landmark to help delivery',
    example: 'Near HDFC Bank ATM',
    required: false,
  })
  @IsString()
  @IsOptional()
  landmark?: string;

  @ApiProperty({
    description: 'The type of address i.e Home, Work or Other',
    enum: AddressType,
    enumName: 'AddressType',
    example: AddressType.HOME,
    required: false,
  })
  @IsEnum(AddressType, { message: 'Type must be HOME, WORK, or OTHER' })
  @IsOptional()
  type: AddressType;

  @ApiProperty({
    description: 'Set this as the default address for checkout',
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDefault: boolean;
}
