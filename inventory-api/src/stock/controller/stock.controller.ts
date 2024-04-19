import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StockService } from '../service/stock.service';
import { StockUpdateDto } from '../dto/stock-updateDto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Stock')
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
  async update(@Param('id') id: number, @Body() data: StockUpdateDto) {
    return await this.stockService.update({
      id,
      quantity: data.quantity,
    });
  }
}
