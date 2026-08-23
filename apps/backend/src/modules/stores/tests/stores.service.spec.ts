import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from '../stores.service';

describe('StoresService', () => {
  let service: StoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoresService],
    }).compile();

    service = module.get(StoresService);
  });

  describe('get', () => {
    it('returns the store name', () => {
      expect(service.get()).toEqual({ name: 'The Tech Library' });
    });
  });
});
