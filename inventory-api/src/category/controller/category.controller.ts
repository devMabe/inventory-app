import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateDto } from '../dto/create.dto';
import { CategoryPresenter } from '../presenter/category.presenter';
import { UpdateDto } from '../dto/update.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createDto: CreateDto) {
    return new CategoryPresenter(await this.categoryService.create(createDto));
  }

  @Get()
  async getAll() {
    const data = await this.categoryService.getAll();
    return data.map((result) => new CategoryPresenter(result));
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return new CategoryPresenter(await this.categoryService.getById(id));
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() update: UpdateDto) {
    return new CategoryPresenter(
      await this.categoryService.update({
        id,
        ...update,
      }),
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const deleted = await this.categoryService.delete(id);
    if (deleted) {
      return {
        message: 'Category deleted successfully',
      };
    }
  }
}
