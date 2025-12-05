import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: createProductDto.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductDto.categoryId} not found`,
      );
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

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException(`No product with ID #${id} found`);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]/, '');
  }
}
