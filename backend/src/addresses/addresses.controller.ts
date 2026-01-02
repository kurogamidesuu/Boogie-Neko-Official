import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAddressDto } from './dto/create-address.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { AuthRequest } from '../auth/interfaces/auth-request.interface';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(
    @Request() req: AuthRequest,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressesService.create(req.user.userId, createAddressDto);
  }

  @Put()
  updateDefault(
    @Request() req: AuthRequest,
    @Body()
    body: {
      id: number;
    },
  ) {
    return this.addressesService.changeDefault(req.user.userId, body.id);
  }

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.addressesService.findAll(req.user.userId);
  }
}
