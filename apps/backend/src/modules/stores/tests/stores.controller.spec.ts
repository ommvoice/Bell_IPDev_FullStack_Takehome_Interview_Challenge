import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from '../stores.controller';
import { StoresService } from '../stores.service';

describe('StoresController', () => {
  let controller: StoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      providers: [StoresService],
    }).compile();

    controller = module.get(StoresController);
  });

  describe('get', () => {
    it('returns the store name', () => {
      expect(controller.get()).toEqual({ name: 'The Tech Library' });
    });
  });
});
