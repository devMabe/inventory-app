import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserPresenter } from '../presenter/user.presenter';
import { UserUpdateDto } from '../dto/user-update.dto';
import { FiltersDto } from '../dto/filters.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
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
  async create(@Body() crateDto: UserCreateDto) {
    return new UserPresenter(await this.userService.create(crateDto));
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() updateDto: UserUpdateDto) {
    return new UserPresenter(await this.userService.update(id, updateDto));
  }

  @Put('active/:id')
  async active(@Param('id') id: number) {
    return new UserPresenter(await this.userService.active(id));
  }
}
