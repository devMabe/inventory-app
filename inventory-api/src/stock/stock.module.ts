import { Module } from '@nestjs/common';
import { StockController } from './controller/stock.controller';
import { StockService } from './service/stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entity/stock.entity';
import { Item } from 'src/item/entity/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Item])],
  providers: [StockService],
  controllers: [StockController],
})
export class StockModule {}
