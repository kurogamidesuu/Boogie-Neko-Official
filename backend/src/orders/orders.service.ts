import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, Prisma } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { MailerService } from '@nestjs-modules/mailer';

const orderWithDetails = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: {
    user: true,
    shippingAddress: true,
    orderItems: {
      include: {
        product: true,
      },
    },
  },
});

type OrderWithDetails = Prisma.OrderGetPayload<typeof orderWithDetails>;

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

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
          status: OrderStatus.AWAITING_PAYMENT,
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

  async confirmPayment(userId: number, createPaymentDto: CreatePaymentDto) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: createPaymentDto.orderId,
      },
      ...orderWithDetails,
    });

    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.AWAITING_PAYMENT) {
      throw new BadRequestException(`
        Order is already in ${order.status} status`);
    }

    const updatedOrder = await this.prisma.order.update({
      where: {
        id: createPaymentDto.orderId,
      },
      data: {
        transactionId: createPaymentDto.transactionId,
        status: OrderStatus.PENDING_APPROVAL,
      },
    });

    await this.sendAdminNotification(order, createPaymentDto.transactionId);

    return updatedOrder;
  }

  private async sendAdminNotification(order: OrderWithDetails, utr: string) {
    const itemsList = order.orderItems
      .map((item) => `-${item.product.title} x ${item.quantity}`)
      .join('\t\n');

    const emailBody = `
    NEW ORDER JUST ARRIVED! 
    
    Order ID: #${order.id}
    Customer: ${order.user.firstName} ${order.user.lastName}
    Total Amount: Rs ${String(order.totalAmount)}

    Transaction ID sent by user: ${utr}

    Shipping Address:
    ${order.shippingAddress.fullName}
    ${order.shippingAddress.houseNumber}, ${order.shippingAddress.area}
    ${order.shippingAddress.city} ${order.shippingAddress.state}
    ${order.shippingAddress.landmark || ''}
    ${order.shippingAddress.pincode}
    (${order.shippingAddress.phone})

    Items:
      ${itemsList}
    `;

    try {
      await this.mailerService.sendMail({
        to: process.env.GMAIL_ADDRESS,
        subject: `[Verify Payment] Order #${order.id} - Rs. ${String(order.totalAmount)}`,
        text: emailBody,
      });
    } catch (e) {
      console.error('Email failed:', e);
    }
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
