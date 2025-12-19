import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AddToCartDto } from './dto/create-cart.dto';
import type { AuthRequest } from '../auth/interfaces/auth-request.interface';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Request() req: AuthRequest, @Body() addToCartDto: AddToCartDto) {
    const userId = req?.user?.userId;
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Get()
  getCart(@Request() req: AuthRequest) {
    const userId = req.user.userId;
    return this.cartService.getCart(userId);
  }
}
