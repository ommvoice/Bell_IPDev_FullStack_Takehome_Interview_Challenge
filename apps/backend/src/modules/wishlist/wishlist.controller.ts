import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import type { Product } from '../../types/products/product';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  get(): Product[] {
    return this.wishlistService.get();
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  add(@Param('id', ParseIntPipe) id: number): Product {
    return this.wishlistService.add(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.wishlistService.remove(id);
  }
}
