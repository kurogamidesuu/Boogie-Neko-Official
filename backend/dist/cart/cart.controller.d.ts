import { CartService } from './cart.service';
import { AddToCartDto } from './dto/create-cart.dto';
import type { AuthRequest } from '../auth/interfaces/auth-request.interface';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(req: AuthRequest, addToCartDto: AddToCartDto): Promise<{
        id: number;
        productId: number;
        quantity: number;
        cartId: number;
    }>;
    getCart(req: AuthRequest): Promise<({
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
