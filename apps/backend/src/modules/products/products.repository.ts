import { Injectable } from '@nestjs/common';
import productsData from '../../data/products.json';
import { Product } from '../../types/products/product';

@Injectable()
export class ProductsRepository {
  private readonly products: Product[] = productsData;
  
  get(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  getByIds(ids: number[]): Product[] {
    const idSet = new Set(ids);
    return this.products.filter((product) => idSet.has(product.id));
  }

  getIds(): number[] {
    return this.products.map((product) => product.id);
  }

  search(term: string): Product[] {
    const normalizedTerm = term.toLowerCase();
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(normalizedTerm),
    );
  }
}
