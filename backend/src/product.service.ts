import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './package/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { IProduct } from './@types';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  public async create(product: CreateProductDto): Promise<void> {
    const productSkuExists = await this.prisma.product.findUnique({
      where: {
        SKU: product.SKU,
      }
    });

    if (productSkuExists) {
      throw new HttpException("SKU já cadastrado em um produto", HttpStatus.BAD_REQUEST);
    }

    await this.prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        SKU: product.SKU,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    return;
  }

  public async find(id: number): Promise<IProduct> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      }
    });

    if (!product) {
      throw new HttpException("Produto não encontrado", HttpStatus.NOT_FOUND);
    }

    return product;
  }

  public async list(): Promise<IProduct[]> {
    const products = await this.prisma.product.findMany({
      orderBy: {
        name: "asc",
      }
    });

    return products;
  }

  public async update(id: number, product: CreateProductDto): Promise<void> {
    const aProduct = await this.find(id);

    if(aProduct.SKU !== product.SKU) {
      const productSkuExists = await this.prisma.product.findUnique({
        where: {
          SKU: product.SKU,
        }
      });
  
      if (productSkuExists) {
        throw new HttpException("SKU já cadastrado em um produto", HttpStatus.BAD_REQUEST);
      }
    }
    await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: product.name,
        price: product.price,
        SKU: product.SKU,
        updatedAt: new Date(),
      }
    });

    return;
  }

  public async delete(id: number): Promise<void> {
    await this.find(id);
    await this.prisma.product.delete({
      where: {
        id,
      }
    });

    return;
  }
}
