import { describe, it, expect, beforeEach } from 'vitest';
import { ProductsRepository } from '../products.repository';

describe('ProductsRepository', () => {
  let repository: ProductsRepository;

  beforeEach(() => {
    repository = new ProductsRepository();
  });

  describe('get', () => {
    it('returns every product from the data file', () => {
      const products = repository.get();
      expect(products.length).toBeGreaterThan(0);
      expect(products[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          type: expect.any(String),
          price: expect.any(Number),
        }),
      );
    });
  });

  describe('getById', () => {
    it('returns the matching product', () => {
      const product = repository.getById(1);
      expect(product?.id).toBe(1);
    });

    it('returns undefined for an unknown id', () => {
      expect(repository.getById(-1)).toBeUndefined();
    });
  });

  describe('getByIds', () => {
    it('returns only the products matching the given ids', () => {
      const products = repository.getByIds([1, 2, -1]);
      expect(products.map((product) => product.id).sort()).toEqual([1, 2]);
    });

    it('returns an empty array when no ids match', () => {
      expect(repository.getByIds([-1, -2])).toEqual([]);
    });
  });

  describe('getIds', () => {
    it('returns the id of every product', () => {
      expect(repository.getIds()).toEqual(
        repository.get().map((product) => product.id),
      );
    });
  });

  describe('search', () => {
    it('matches product names case-insensitively', () => {
      const results = repository.search('keyboard');
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.every((product) =>
          product.name.toLowerCase().includes('keyboard'),
        ),
      ).toBe(true);
    });

    it('returns an empty array when nothing matches', () => {
      expect(repository.search('does-not-exist')).toEqual([]);
    });
  });
});
