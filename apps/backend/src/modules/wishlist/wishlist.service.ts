import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';
import { ProductsRepository } from '../products/products.repository';
import { Product } from '../../types/products/product';

@Injectable()
export class WishlistService {
  constructor(
    private readonly wishlistRepository: WishlistRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  get(): Product[] {
    return this.productsRepository.getByIds(this.wishlistRepository.getIds());
  }

  add(id: number): Product {
    const product = this.productsRepository.getById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} does not exist`);
    }

    if (this.wishlistRepository.getIds().includes(id)) {
      throw new ConflictException(`Product with id ${id} is already in the wishlist`);
    }

    this.wishlistRepository.add(id);
    return product;
  }

  remove(id: number): void {
    if (!this.wishlistRepository.getIds().includes(id)) {
      throw new NotFoundException(`Product with id ${id} is not in the wishlist`);
    }

    this.wishlistRepository.remove(id);
  }
}
