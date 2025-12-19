import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    private generateSlug;
}
