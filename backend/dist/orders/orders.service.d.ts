import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkout(userId: number, createOrderDto: CreateOrderDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        shippingAddress: string;
        orderDate: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
    }>;
    findMyOrders(userId: number): Promise<({
        orderItems: ({
            product: {
                description: string;
                title: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                categoryId: number;
                slug: string;
                isActive: boolean;
            };
        } & {
            id: number;
            productId: number;
            quantity: number;
            priceAtPurchase: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        shippingAddress: string;
        orderDate: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
    })[]>;
}
