import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
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
            price: import("@prisma/client/runtime/library").Decimal;
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
        price: import("@prisma/client/runtime/library").Decimal;
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
        price: import("@prisma/client/runtime/library").Decimal;
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
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
    }>;
    uploadImage(id: number, file: Express.Multer.File): Promise<{
        id: number;
        url: string;
        altText: string | null;
        isPrimary: boolean;
        productId: number;
    }>;
}
