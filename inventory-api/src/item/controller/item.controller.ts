import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemService } from '../service/item.service';
import { CreateDto } from '../dto/create.dto';
import { UpdateDto } from '../dto/update.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() args: CreateDto) {
    return await this.itemService.create(args);
  }

  @Put("/:id")
  async update(@Param("id") id: number,@Body() args: UpdateDto) {
    return await this.itemService.update(id, args)
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    const response = await this.itemService.delete(id)
    if (response) return "Item deleted"
  }

  @Get()
  async find() {
    return await this.itemService.findAll();
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    return await this.itemService.get(id)
  }
}
