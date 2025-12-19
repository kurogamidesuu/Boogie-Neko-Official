import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        title: string;
        slug: string;
        description: string;
        price: Prisma.Decimal;
        stock: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
    }>;
    findAll(query: ProductQueryDto): Promise<{
        data: ({
            category: {
                id: number;
                name: string;
            };
        } & {
            title: string;
            slug: string;
            description: string;
            price: Prisma.Decimal;
            stock: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            categoryId: number;
        })[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: number): Promise<{
        title: string;
        slug: string;
        description: string;
        price: Prisma.Decimal;
        stock: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        title: string;
        slug: string;
        description: string;
        price: Prisma.Decimal;
        stock: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
    }>;
    remove(id: number): Promise<{
        title: string;
        slug: string;
        description: string;
        price: Prisma.Decimal;
        stock: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
    }>;
    private generateSlug;
}
