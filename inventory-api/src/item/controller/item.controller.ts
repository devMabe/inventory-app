import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from '../service/item.service';
import { ItemCreateDto } from '../dto/item-create.dto';
import { ItemUpdateDto } from '../dto/item-update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() args: ItemCreateDto) {
    return await this.itemService.create(args);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() args: ItemUpdateDto) {
    return await this.itemService.update(id, args);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const response = await this.itemService.delete(id);
    if (response) return 'Item deleted';
  }

  @Get()
  async find() {
    return await this.itemService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.itemService.get(id);
  }
}
