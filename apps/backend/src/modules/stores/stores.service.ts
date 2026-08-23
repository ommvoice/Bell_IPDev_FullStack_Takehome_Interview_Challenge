import { Injectable } from '@nestjs/common';

@Injectable()
export class StoresService {
  get(): { name: string } {
    return { name: 'The Tech Library' };
  }
}
