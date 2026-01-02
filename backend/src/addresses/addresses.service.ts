import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createAddressDto: CreateAddressDto) {
    if (createAddressDto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: {
          isDefault: false,
        },
      });
    }

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

  async changeDefault(userId: number, id: number) {
    await this.prisma.address.updateMany({
      where: { userId },
      data: {
        isDefault: false,
      },
    });

    return await this.prisma.address.update({
      where: { id },
      data: {
        isDefault: true,
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
