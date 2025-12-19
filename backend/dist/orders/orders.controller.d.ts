import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import type { AuthRequest } from '../auth/interfaces/auth-request.interface';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    checkout(req: AuthRequest, createOrderDto: CreateOrderDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        shippingAddress: string;
        orderDate: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
    }>;
    findMyOrders(req: AuthRequest): Promise<({
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
