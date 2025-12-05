import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        title: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
    }>;
    findAll(): Promise<({
        category: {
            id: number;
            name: string;
        };
    } & {
        title: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
    })[]>;
    findOne(id: number): Promise<void>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
    private generateSlug;
}
