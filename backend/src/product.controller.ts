import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { IProductResponseDto } from './@types';
import { findFirstMissingLetter } from './package/find-first-missing-letter';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("/products")
  @HttpCode(201)
  public async create(@Body() product: CreateProductDto): Promise<void> {
    await this.productService.create(product);

    return;
  }

  @Get("/products/:id")
  public async find(@Param("id") id: number): Promise<IProductResponseDto> {
    const product = await this.productService.find(Number(id));

    const output: IProductResponseDto = {
      id: product.id,
      name: product.name,
      price: product.price,
      SKU: product.SKU,
      firstMissingLetter: findFirstMissingLetter(product.name),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }

    return output
  }

  @Get("/products")
  @HttpCode(200)
  public async list(): Promise<IProductResponseDto[]> {
    const products = await this.productService.list();

    const output: IProductResponseDto[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      SKU: product.SKU,
      firstMissingLetter: findFirstMissingLetter(product.name),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return output;
  }

  @Put("/products/:id")
  @HttpCode(204)
  public async update(@Param("id") id: number, @Body() product: CreateProductDto): Promise<void> {
    await this.productService.update(Number(id), product);

    return;
  }

  @Delete("/products/:id")
  @HttpCode(204)
  public async delete(@Param("id") id: number): Promise<void> {
    await this.productService.delete(Number(id));

    return;
  }
}
