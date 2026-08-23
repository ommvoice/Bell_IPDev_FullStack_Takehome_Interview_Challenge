import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { Product } from '../../../types/products/product';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: { search: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    service = { search: vi.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: service }],
    }).compile();

    controller = module.get(ProductsController);
  });

  describe('search', () => {
    it('returns the products from the service for a given term', () => {
      const products: Product[] = [
        {
          id: 1,
          name: 'Wireless Headphones',
          type: 'Electronics',
          price: 79.99,
          image: 'headphones.jpg',
        },
      ];
      service.search.mockReturnValue(products);

      expect(controller.search('headphones')).toEqual(products);
      expect(service.search).toHaveBeenCalledWith('headphones');
    });

    it('passes through an undefined search term', () => {
      service.search.mockReturnValue([]);

      controller.search(undefined);

      expect(service.search).toHaveBeenCalledWith(undefined);
    });
  });
});
