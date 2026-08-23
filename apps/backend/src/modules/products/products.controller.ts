import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from '../../types/products/product';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  search(@Query('search') search?: string): Product[] {
    return this.productsService.search(search);
  }
}
