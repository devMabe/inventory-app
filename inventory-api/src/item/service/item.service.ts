import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entity/item.entity';
import { Repository } from 'typeorm';
import { IItem } from '../model/item.model';
import { CreateDto } from '../dto/create.dto';
import { Category } from 'src/category/entity/category.entity';
import { Stock } from 'src/stock/entity/stock.entity';
import { UpdateDto } from '../dto/update.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async get(id: number): Promise<IItem> {
    const found = await this.itemRepository.findOneBy({ id, active: true });

    if (!found) throw new NotFoundException('Item not found');

    return found;
  }

  async findAll(): Promise<IItem[]> {
    return await this.itemRepository.find({
      where: { active: true },
      relations: { category: true, stock: true },
    });
  }

  async create(args: CreateDto): Promise<IItem> {
    const { name, price, categoryId, image } = args;

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!category) throw new NotFoundException('Category not found');

    const itemFound = await this.itemRepository.findOneBy({ name });

    if (itemFound) throw new BadRequestException('Item al ready exists');

    const itemCreated = this.itemRepository.create({
      name,
      price,
      image,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const item = await this.itemRepository.save(itemCreated);

    const stock = this.stockRepository.create({
      item,
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.stockRepository.save(stock);

    return await this.itemRepository.findOne({
      where: { id: item.id },
      relations: {
        category: true,
      },
    });
  }

  async update(id: number, args: UpdateDto): Promise<IItem> {
    const found = await this.get(id);

    found.updatedAt = new Date();
    Object.assign(args, found);
    await this.itemRepository.save(found);

    return await this.get(id);
  }

  async delete(id: number): Promise<boolean> {
    const found = await this.get(id);

    if (found) {
      await this.itemRepository.update(id, { active: false });
      return true;
    }

    return false;
  }
}
