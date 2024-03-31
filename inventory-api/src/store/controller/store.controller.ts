import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StoreService } from '../service/store.service';
import { CreateDto } from '../dto/create.dto';
import { StorePresenter } from '../presenter/store.presenter';
import { UpdateDto } from '../dto/update.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async create(@Body() createDto: CreateDto) {
    return new StorePresenter(await this.storeService.create(createDto));
  }

  @Get('/all/:userId')
  async getAll(@Param('userId') userId?: number) {
    const data = await this.storeService.getAll(userId);
    return data.map((result) => new StorePresenter(result));
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return new StorePresenter(await this.storeService.getById(id));
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateDto: UpdateDto) {
    updateDto.id = id;
    return new StorePresenter(await this.storeService.update(updateDto));
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const response = await this.storeService.delete(id);
    if (response) {
      return {
        message: 'Store deleted successfully',
      };
    }
  }
}
