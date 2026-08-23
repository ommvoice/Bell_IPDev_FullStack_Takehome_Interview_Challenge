import { Module } from '@nestjs/common';
import { StoresModule } from './modules/stores/stores.module';
import { ProductsModule } from './modules/products/products.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';

@Module({
  imports: [StoresModule, ProductsModule, WishlistModule],
})
export class AppModule {}
