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
import { StoreCreateDto } from '../dto/store-create.dto';
import { StorePresenter } from '../presenter/store.presenter';
import { StoreUpdateDto } from '../dto/store-update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async create(@Body() storeCreateDto: StoreCreateDto) {
    return new StorePresenter(await this.storeService.create(storeCreateDto));
  }

  @Get('/:userId')
  async getAll(@Param('userId') userId?: number) {
    const data = await this.storeService.getAll(userId);
    return data.map((result) => new StorePresenter(result));
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return new StorePresenter(await this.storeService.getById(id));
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateDto: StoreUpdateDto) {
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
