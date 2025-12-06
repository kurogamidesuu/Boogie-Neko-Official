import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
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
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        slug: string;
        isActive: boolean;
    })[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        slug: string;
        isActive: boolean;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        slug: string;
        isActive: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        slug: string;
        isActive: boolean;
    }>;
    private generateSlug;
}
