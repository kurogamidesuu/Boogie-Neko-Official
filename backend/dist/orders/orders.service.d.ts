import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkout(userId: number, createOrderDto: CreateOrderDto): Promise<{
        orderDate: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddress: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findMyOrders(userId: number): Promise<({
        orderItems: ({
            product: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                title: string;
                slug: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                isActive: boolean;
                categoryId: number;
            };
        } & {
            id: number;
            quantity: number;
            productId: number;
            priceAtPurchase: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        orderDate: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddress: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    })[]>;
}
