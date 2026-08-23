import { describe, it, expect, beforeEach } from 'vitest';
import { WishlistRepository } from '../wishlist.repository';

describe('WishlistRepository', () => {
  let repository: WishlistRepository;

  beforeEach(() => {
    repository = new WishlistRepository();
  });

  describe('getIds', () => {
    it('starts empty', () => {
      expect(repository.getIds()).toEqual([]);
    });
  });

  describe('add', () => {
    it('adds an id to the wishlist', () => {
      repository.add(1);
      expect(repository.getIds()).toEqual([1]);
    });

    it('does not duplicate an id added twice', () => {
      repository.add(1);
      repository.add(1);
      expect(repository.getIds()).toEqual([1]);
    });
  });

  describe('remove', () => {
    it('removes an id from the wishlist', () => {
      repository.add(1);
      repository.remove(1);
      expect(repository.getIds()).toEqual([]);
    });

    it('does nothing when the id is not present', () => {
      expect(() => repository.remove(99)).not.toThrow();
      expect(repository.getIds()).toEqual([]);
    });
  });
});
