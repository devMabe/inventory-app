import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '../entity/store.entity';
import { Repository } from 'typeorm';
import { ICrudGeneric } from 'src/interface/crud.generic';
import { IStore } from '../model/store.model';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class StoreService implements ICrudGeneric<IStore> {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>,
    private readonly userService: UserService,
  ) {}

  async getAll(userId?: number): Promise<IStore[]> {
    const user = await this.userService.get(userId);
    if (!user) throw new NotFoundException('User not found');

    return await this.storeRepository.find({
      where: {
        ...(user && {
          user,
        }),
      },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getById(id: number): Promise<IStore> {
    const found = await this.storeRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!found) throw new NotFoundException('Store not found');
    return found;
  }

  async create(args?: IStore): Promise<IStore> {
    const user = await this.userService.get(args.userId);
    if (!user) throw new NotFoundException('User not found');

    const storeExists = await this.storeRepository.findOneBy({
      name: args.name,
    });
    if (storeExists) throw new BadRequestException('Store al ready exists');

    const store = this.storeRepository.create({ user, ...args });

    store.createdAt = new Date();
    store.updatedAt = new Date();

    const { id } = await this.storeRepository.save(store);
    return await this.getById(id);
  }

  async update(args: IStore): Promise<IStore> {
    const { id, ...rest } = args;

    if (args.name) {
      const storeExists = await this.storeRepository.findOneBy({
        name: args.name,
      });
      if (storeExists) throw new BadRequestException('Store al ready exists');
    }

    const found = await this.getById(id);
    if (!found) throw new NotFoundException('Store not found');

    rest.updatedAt = new Date();
    await this.storeRepository.update(id, rest);
    return await this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const found = await this.getById(id);
    if (!found) throw new NotFoundException('Store not found');

    await this.storeRepository.delete(id);

    return true;
  }
}
