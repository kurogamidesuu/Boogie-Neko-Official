import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
    findOne(id: string): Promise<void>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
