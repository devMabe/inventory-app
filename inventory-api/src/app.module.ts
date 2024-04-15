import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { Store } from './store/entity/store.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entity/category.entity';
import { ItemModule } from './item/item.module';
import { StockModule } from './stock/stock.module';
import { Item } from './item/entity/item.entity';
import { Stock } from './stock/entity/stock.entity';
import { checkJWT } from './auth/middleware/session';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Store, Category, Item, Stock],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    StoreModule,
    CategoryModule,
    StockModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkJWT)
      .forRoutes('user', 'store', 'category', 'item', 'stock');
  }
}
