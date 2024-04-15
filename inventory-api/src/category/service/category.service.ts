import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entity/category.entity';
import { Repository } from 'typeorm';
import { ICrudGeneric } from 'src/interface/crud.generic';
import { ICategory } from '../model/category.model';
import { CreateDto } from '../dto/create.dto';
import { StoreService } from 'src/store/service/store.service';

@Injectable()
export class CategoryService implements ICrudGeneric<ICategory> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly storeService: StoreService,
  ) {}

  async getAll(userId?: number): Promise<ICategory[]> {
    return await this.categoryRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        store: true,
        items: true,
      },
    });
  }

  async getById(id: number): Promise<ICategory> {
    const found = await this.categoryRepository.findOne({
      where: { id },
      relations: { store: true, items: true },
    });
    if (!found) throw new NotFoundException('Category not found');
    return found;
  }

  async create(args?: CreateDto): Promise<ICategory> {
    const { storeId, name } = args;

    const store = await this.storeService.getById(storeId);

    const categoryExists = await this.categoryRepository.findOneBy({ name });

    if (categoryExists)
      throw new BadRequestException('Category already exists');

    const category = this.categoryRepository.create({
      name,
      store,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const { id } = await this.categoryRepository.save(category);

    return await this.getById(id);
  }

  async update(args: ICategory): Promise<ICategory> {
    const { id, ...rest } = args;

    const categoryExists = await this.categoryRepository.findOneBy({
      name: rest.name,
    });

    if (categoryExists)
      throw new BadRequestException('Category already exists');

    const found = await this.getById(id);

    if (found) {
      rest.updatedAt = new Date();
      await this.categoryRepository.update(id, rest);
      return await this.getById(id);
    }
  }

  async delete(id: number): Promise<boolean> {
    const found = await this.getById(id);

    if (found) {
      await this.categoryRepository.delete(id);
      return true;
    }

    return false;
  }
}
