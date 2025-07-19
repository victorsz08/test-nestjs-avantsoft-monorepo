import { IsNotEmpty, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: "O nome do produto é obrigatório" })
    name: string;

    @IsNotEmpty({ message: "O preço do produto é obrigatório" })
    @Min(1, { message: "O preço do produto deve ser maior que 1" })
    price: number;

    @IsNotEmpty({ message: "O SKU do produto é obrigatório" })
    SKU: string;
}