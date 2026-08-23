import { Injectable } from '@nestjs/common';

@Injectable()
export class WishlistRepository {
  private readonly ids = new Set<number>();

  getIds(): number[] {
    return Array.from(this.ids);
  }

  add(id: number): void {
    this.ids.add(id);
  }

  remove(id: number): void {
    this.ids.delete(id);
  }
}
