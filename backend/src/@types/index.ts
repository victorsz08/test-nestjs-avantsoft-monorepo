export interface IProduct {
  id: number;
  name: string;
  price: number;
  SKU: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductResponseDto extends IProduct {
  firstMissingLetter: string;
}
