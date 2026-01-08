import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/create-cart.dto';
import { RemoveFromCartDto } from './dto/remove-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(userId: number, dto: AddToCartDto) {
    let cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: dto.productId,
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + dto.quantity,
        },
      });
    } else {
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          quantity: dto.quantity,
        },
      });
    }
  }

  async removeFromCart(userId: number, removeFromCartDto: RemoveFromCartDto) {
    const cart = await this.getCart(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const product = cart.items.find(
      (i) => i.productId === removeFromCartDto.productId,
    );

    if (!product) throw new NotFoundException('Product not found');

    if (product.quantity === 1) {
      return this.prisma.cartItem.delete({
        where: {
          id: product.id,
        },
      });
    } else {
      return this.prisma.cartItem.update({
        where: {
          id: product.id,
        },
        data: {
          quantity: product.quantity - removeFromCartDto.quantity,
        },
      });
    }
  }

  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }
}
