import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { WishlistService } from '../wishlist.service';
import { WishlistRepository } from '../wishlist.repository';
import { ProductsRepository } from '../../products/products.repository';
import { Product } from '../../../types/products/product';

const product: Product = {
  id: 1,
  name: 'Wireless Headphones',
  type: 'Electronics',
  price: 79.99,
  image: 'headphones.jpg',
};

describe('WishlistService', () => {
  let service: WishlistService;
  let wishlistRepository: {
    getIds: ReturnType<typeof vi.fn>;
    add: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };
  let productsRepository: {
    getById: ReturnType<typeof vi.fn>;
    getByIds: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    wishlistRepository = {
      getIds: vi.fn().mockReturnValue([]),
      add: vi.fn(),
      remove: vi.fn(),
    };
    productsRepository = { getById: vi.fn(), getByIds: vi.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistService,
        { provide: WishlistRepository, useValue: wishlistRepository },
        { provide: ProductsRepository, useValue: productsRepository },
      ],
    }).compile();

    service = module.get(WishlistService);
  });

  describe('get', () => {
    it('returns the products for the wishlisted ids', () => {
      wishlistRepository.getIds.mockReturnValue([1]);
      productsRepository.getByIds.mockReturnValue([product]);

      expect(service.get()).toEqual([product]);
      expect(productsRepository.getByIds).toHaveBeenCalledWith([1]);
    });
  });

  describe('add', () => {
    it('adds a known product and returns it', () => {
      productsRepository.getById.mockReturnValue(product);

      expect(service.add(1)).toEqual(product);
      expect(wishlistRepository.add).toHaveBeenCalledWith(1);
    });

    it('throws NotFoundException for an unknown product', () => {
      productsRepository.getById.mockReturnValue(undefined);

      expect(() => service.add(999)).toThrow(NotFoundException);
      expect(wishlistRepository.add).not.toHaveBeenCalled();
    });

    it('throws ConflictException when the product is already wishlisted', () => {
      productsRepository.getById.mockReturnValue(product);
      wishlistRepository.getIds.mockReturnValue([1]);

      expect(() => service.add(1)).toThrow(ConflictException);
      expect(wishlistRepository.add).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('removes a wishlisted product', () => {
      wishlistRepository.getIds.mockReturnValue([1]);

      service.remove(1);

      expect(wishlistRepository.remove).toHaveBeenCalledWith(1);
    });

    it('throws NotFoundException when the product is not wishlisted', () => {
      wishlistRepository.getIds.mockReturnValue([]);

      expect(() => service.remove(1)).toThrow(NotFoundException);
      expect(wishlistRepository.remove).not.toHaveBeenCalled();
    });
  });
});
