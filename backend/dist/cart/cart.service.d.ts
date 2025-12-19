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
            cartId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }) | null>;
}
