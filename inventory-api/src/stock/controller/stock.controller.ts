import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StockService } from '../service/stock.service';
import { UpdateDto } from '../dto/updateDto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.stockService.get(id);
  }

  @Get('/:itemId')
  async getByItem(@Param('itemId') itemId: number) {
    return await this.stockService.getByItem(itemId);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: UpdateDto) {
    return await this.stockService.update({
      id,
      quantity: data.quantity,
    });
  }
}
