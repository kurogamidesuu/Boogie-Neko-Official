import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/create-cart.dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addToCart(userId: number, dto: AddToCartDto): Promise<{
        id: number;
        quantity: number;
        cartId: number;
        productId: number;
    }>;
    getCart(userId: number): Promise<({
        items: ({
            product: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
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
            cartId: number;
            productId: number;
        })[];
    } & {
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
