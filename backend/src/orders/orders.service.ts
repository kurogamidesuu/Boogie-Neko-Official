import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(userId: number, createOrderDto: CreateOrderDto) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty!');
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount: total,
          shippingAddressId: createOrderDto.shippingAddressId,
          status: OrderStatus.PENDING_APPROVAL,
          orderItems: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: item.product.price,
            })),
          },
        },
      });

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      return order;
    });
  }

  async findMyOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
