"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        const category = await this.prisma.category.findUnique({
            where: {
                id: createProductDto.categoryId,
            },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${createProductDto.categoryId} not found`);
        }
        return this.prisma.product.create({
            data: {
                title: createProductDto.title,
                description: createProductDto.description,
                price: createProductDto.price,
                stock: createProductDto.stock,
                categoryId: createProductDto.categoryId,
                slug: this.generateSlug(createProductDto.title),
            },
        });
    }
    async findAll(query) {
        const { search, page, limit, sort } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.title = {
                contains: search,
                mode: 'insensitive',
            };
        }
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                take: limit,
                skip: skip,
                orderBy: sort ? { price: sort } : { id: 'desc' },
                include: {
                    category: true,
                    images: true,
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data: products,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
            },
        });
        if (!product)
            throw new common_1.NotFoundException(`No product with ID #${id} found`);
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        if (!product)
            throw new common_1.NotFoundException(`No product with ID #${id} found`);
        const updatedProduct = await this.prisma.product.update({
            where: {
                id,
            },
            data: updateProductDto,
        });
        return updatedProduct;
    }
    async remove(id) {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
            },
        });
        if (!product)
            throw new common_1.NotFoundException(`No product with ID #${id} found`);
        const deletedProduct = await this.prisma.product.delete({
            where: {
                id,
            },
        });
        return deletedProduct;
    }
    async saveImage(productId, file) {
        const product = await this.findOne(productId);
        if (!product)
            throw new common_1.NotFoundException(`Product with id #${productId} not found`);
        const imageUrl = `/uploads/${file.filename}`;
        return this.prisma.productImage.create({
            data: {
                url: imageUrl,
                altText: product.title,
                productId,
            },
        });
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]/, '')
            .concat(String(Math.round(Math.random() * 1e9)));
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map