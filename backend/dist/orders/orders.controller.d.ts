import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import type { AuthRequest } from '../auth/interfaces/auth-request.interface';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    checkout(req: AuthRequest, createOrderDto: CreateOrderDto): Promise<{
        orderDate: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddress: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findMyOrders(req: AuthRequest): Promise<({
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
