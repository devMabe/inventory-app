import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from '../entity/stock.entity';
import { Repository } from 'typeorm';
import { IStock } from '../model/stock.model';
import { Item } from 'src/item/entity/item.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(args: IStock): Promise<IStock> {
    const stock = this.stockRepository.create(args);
    return await this.stockRepository.save(stock);
  }

  async getByItem(id: number): Promise<IStock> {
    const item = await this.itemRepository.findOneBy({
      id,
    });

    if (!item) throw new NotFoundException('Item not found');

    const found = await this.stockRepository.findOneBy({
      item,
    });

    if (!found) throw new NotFoundException('Stock not found');

    return found;
  }

  async get(id: number): Promise<IStock> {
    const found = await this.stockRepository.findOneBy({ id });

    if (!found) throw new NotFoundException('Stock not found');

    return found;
  }

  async update(args: IStock): Promise<void> {
    const { id, quantity } = args;
    const found = await this.get(id);

    if (quantity < 0) throw new BadRequestException('Invalid quantity');

    found.quantity = quantity;
    await this.stockRepository.update(id, found);
  }
}
