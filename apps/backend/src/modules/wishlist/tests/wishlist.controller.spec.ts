import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from '../wishlist.controller';
import { WishlistService } from '../wishlist.service';
import { Product } from '../../../types/products/product';

const product: Product = {
  id: 1,
  name: 'Wireless Headphones',
  type: 'Electronics',
  price: 79.99,
  image: 'headphones.jpg',
};

describe('WishlistController', () => {
  let controller: WishlistController;
  let service: {
    get: ReturnType<typeof vi.fn>;
    add: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    service = { get: vi.fn(), add: vi.fn(), remove: vi.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [{ provide: WishlistService, useValue: service }],
    }).compile();

    controller = module.get(WishlistController);
  });

  describe('get', () => {
    it('returns the wishlisted products', () => {
      service.get.mockReturnValue([product]);

      expect(controller.get()).toEqual([product]);
    });
  });

  describe('add', () => {
    it('returns the added product', () => {
      service.add.mockReturnValue(product);

      expect(controller.add(1)).toEqual(product);
      expect(service.add).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('delegates removal to the service', () => {
      controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
