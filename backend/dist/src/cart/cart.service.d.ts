import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/create-cart.dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addToCart(userId: number, dto: AddToCartDto): Promise<{
        id: number;
        productId: number;
        quantity: number;
        cartId: number;
    }>;
    getCart(userId: number): Promise<({
        items: ({
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
            cartId: number;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }) | null>;
}
