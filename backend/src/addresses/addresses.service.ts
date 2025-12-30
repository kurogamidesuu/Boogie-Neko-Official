import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createAddressDto: CreateAddressDto) {
    return this.prisma.address.create({
      data: {
        fullName: createAddressDto.fullName,
        phone: createAddressDto.phone,
        pincode: createAddressDto.pincode,
        city: createAddressDto.city,
        state: createAddressDto.state,
        houseNumber: createAddressDto.houseNumber,
        area: createAddressDto.area,
        landmark: createAddressDto.landmark || '',
        type: createAddressDto.type,
        isDefault: createAddressDto.isDefault,
        userId: userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.address.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
