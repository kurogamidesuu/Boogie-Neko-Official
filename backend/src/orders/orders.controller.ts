import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from './dto/create-order.dto';
import type { AuthRequest } from '../auth/interfaces/auth-request.interface';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  checkout(
    @Request() req: AuthRequest,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.checkout(req.user.userId, createOrderDto);
  }

  @Get()
  findMyOrders(@Request() req: AuthRequest) {
    return this.ordersService.findMyOrders(req.user.userId);
  }
}
