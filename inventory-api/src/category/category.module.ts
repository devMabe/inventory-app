import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Store } from 'src/store/entity/store.entity';
import { StoreService } from 'src/store/service/store.service';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Store, User])],
  providers: [CategoryService, StoreService, UserService],
  controllers: [CategoryController],
})
export class CategoryModule {}
