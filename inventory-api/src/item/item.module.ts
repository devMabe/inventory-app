import { Module } from '@nestjs/common';
import { ItemService } from './service/item.service';
import { ItemController } from './controller/item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entity/item.entity';
import { Category } from 'src/category/entity/category.entity';
import { Stock } from 'src/stock/entity/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Category, Stock])],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
