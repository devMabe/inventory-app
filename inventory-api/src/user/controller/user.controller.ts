import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateDto } from '../dto/create.dto';
import { UserPresenter } from '../presenter/user.presenter';
import { UpdateDto } from '../dto/update.dto';
import { FiltersDto } from '../dto/filters.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Body() filters?: FiltersDto) {
    const data = await this.userService.getAll(filters);
    return data.map((user) => new UserPresenter(user));
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return new UserPresenter(await this.userService.get(id));
  }

  @Post()
  async create(@Body() crateDto: CreateDto) {
    return new UserPresenter(await this.userService.create(crateDto));
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() updateDto: UpdateDto) {
    return new UserPresenter(await this.userService.update(id, updateDto));
  }

  @Put('active/:id')
  async active(@Param('id') id: number) {
    return new UserPresenter(await this.userService.active(id));
  }
}
