import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
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
    }>;
    findAll(): Promise<({
        category: {
            id: number;
            name: string;
        };
    } & {
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
    })[]>;
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
    private generateSlug;
}
