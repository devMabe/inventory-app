import { Module } from '@nestjs/common';
import { StoreService } from './service/store.service';
import { StoreController } from './controller/store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entity/store.entity';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, User])],
  providers: [StoreService, UserService],
  controllers: [StoreController],
})
export class StoreModule {}
