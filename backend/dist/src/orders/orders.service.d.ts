import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkout(userId: number, createOrderDto: CreateOrderDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        shippingAddress: string;
        orderDate: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
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
            productId: number;
            quantity: number;
            priceAtPurchase: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        shippingAddress: string;
        orderDate: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
    })[]>;
}
