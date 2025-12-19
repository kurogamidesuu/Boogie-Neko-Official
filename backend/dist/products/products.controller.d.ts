import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        id: number;
        slug: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        category: {
            id: number;
            name: string;
        };
    } & {
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        id: number;
        slug: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        id: number;
        slug: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        id: number;
        slug: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        id: number;
        slug: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
