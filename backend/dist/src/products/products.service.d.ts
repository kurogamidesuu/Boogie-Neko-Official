import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        slug: string;
        description: string;
        price: Prisma.Decimal;
        stock: number;
        isActive: boolean;
        categoryId: number;
    }>;
    findAll(query: ProductQueryDto): Promise<{
        data: ({
            category: {
                id: number;
                name: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
            slug: string;
            description: string;
            price: Prisma.Decimal;
            stock: number;
            isActive: boolean;
            categoryId: number;
        })[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        slug: string;
        description: string;
        price: Prisma.Decimal;
        stock: number;
        isActive: boolean;
        categoryId: number;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        slug: string;
        description: string;
        price: Prisma.Decimal;
        stock: number;
        isActive: boolean;
        categoryId: number;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        slug: string;
        description: string;
        price: Prisma.Decimal;
        stock: number;
        isActive: boolean;
        categoryId: number;
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
