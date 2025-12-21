import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        description: string;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        price: Prisma.Decimal;
        stock: number;
        categoryId: number;
        slug: string;
        isActive: boolean;
    }>;
    findAll(query: ProductQueryDto): Promise<{
        data: ({
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
            price: Prisma.Decimal;
            stock: number;
            categoryId: number;
            slug: string;
            isActive: boolean;
        })[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: number): Promise<{
        description: string;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        price: Prisma.Decimal;
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
        price: Prisma.Decimal;
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
        price: Prisma.Decimal;
        stock: number;
        categoryId: number;
        slug: string;
        isActive: boolean;
    }>;
    saveImage(productId: number, file: Express.Multer.File): Promise<{
        id: number;
        url: string;
        altText: string | null;
        isPrimary: boolean;
        productId: number;
    }>;
    private generateSlug;
}
