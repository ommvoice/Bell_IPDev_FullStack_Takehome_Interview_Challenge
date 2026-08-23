import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { ProductsRepository } from '../products.repository';
import { Product } from '../../../types/products/product';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    type: 'Electronics',
    price: 79.99,
    image: 'headphones.jpg',
  },
  {
    id: 2,
    name: 'Cotton T-Shirt',
    type: 'Clothing',
    price: 19.99,
    image: 'shirt.jpg',
  },
];

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: {
    get: ReturnType<typeof vi.fn>;
    search: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    repository = {
      get: vi.fn().mockReturnValue(mockProducts),
      search: vi.fn().mockReturnValue([mockProducts[0]]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: repository },
      ],
    }).compile();

    service = module.get(ProductsService);
  });

  describe('search', () => {
    it('returns every product when no search term is given', () => {
      const result = service.search();

      expect(result).toEqual(mockProducts);
      expect(repository.get).toHaveBeenCalled();
      expect(repository.search).not.toHaveBeenCalled();
    });

    it('returns every product when the search term is empty', () => {
      const result = service.search('');

      expect(result).toEqual(mockProducts);
      expect(repository.get).toHaveBeenCalled();
      expect(repository.search).not.toHaveBeenCalled();
    });

    it('delegates to the repository search for a given term', () => {
      const result = service.search('headphones');

      expect(repository.search).toHaveBeenCalledWith('headphones');
      expect(result).toEqual([mockProducts[0]]);
    });
  });
});
