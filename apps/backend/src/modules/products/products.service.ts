import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from '../../types/products/product';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  search(term?: string): Product[] {
    if (!term) {
      return this.productsRepository.get();
    }
    return this.productsRepository.search(term);
  }
}
