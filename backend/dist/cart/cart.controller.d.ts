import { CartService } from './cart.service';
import { AddToCartDto } from './dto/create-cart.dto';
import type { AuthRequest } from '../auth/interfaces/auth-request.interface';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(req: AuthRequest, addToCartDto: AddToCartDto): Promise<{
        id: number;
        quantity: number;
        cartId: number;
        productId: number;
    }>;
    getCart(req: AuthRequest): Promise<({
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
