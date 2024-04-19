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
import { CategoryCreateDto } from '../dto/category-create.dto';
import { CategoryPresenter } from '../presenter/category.presenter';
import { CategoryUpdateDto } from '../dto/category-update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() categoryCreateDto: CategoryCreateDto) {
    return new CategoryPresenter(
      await this.categoryService.create(categoryCreateDto),
    );
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
  async update(@Param('id') id: number, @Body() update: CategoryUpdateDto) {
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
