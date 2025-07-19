import { IsNotEmpty, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ context: 'name', message: 'O nome do produto é obrigatório' })
  name: string;

  @IsNotEmpty({ context: 'price', message: 'O preço do produto é obrigatório' })
  @Min(1, {
    context: 'price',
    message: 'O preço do produto deve ser maior que 1',
  })
  price: number;

  @IsNotEmpty({ context: 'SKU', message: 'O SKU do produto é obrigatório' })
  SKU: string;
}
