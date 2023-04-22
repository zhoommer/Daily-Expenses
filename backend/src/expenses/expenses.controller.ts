import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { CreateExpensesDto } from './dtos/createExpenses.dto';
import { UpdateExpensesDto } from './dtos/updateExpenses.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get('/user')
  getUser(@GetCurrentUser('sub') userId: number) {
    return this.expensesService.getUsers(userId);
  }

  @Get('/user-detail')
  getUserDetail(@GetCurrentUser('sub') userId: number) {
    return this.expensesService.getUserDetail(userId);
  }

  @Post('/add')
  addExpenses(
    @GetCurrentUser('sub') userId: number,
    @Body() dto: CreateExpensesDto,
  ) {
    return this.expensesService.addExpenses(userId, dto);
  }

  @Get('/expenses')
  getList(@GetCurrentUser('sub') userId: number) {
    return this.expensesService.getList(userId);
  }

  @Get('/list/:page')
  getExpenses(
    @GetCurrentUser('sub') userId: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    return this.expensesService.getExpenses(userId, page);
  }

  @Get('/search/:search')
  getExpensesFiltering(
    @GetCurrentUser('sub') userId: number,
    @Param('search') search: string,
  ) {
    return this.expensesService.getExpensesFilter(userId, search);
  }

  @Put('/update/:id')
  updateExpenses(
    @GetCurrentUser('sub') userId: number,
    @Param('id', ParseIntPipe) id: number,
    dto: UpdateExpensesDto,
  ) {
    return this.expensesService.updateExpenses(userId, id, dto);
  }

  @Post('/delete/:id')
  deleteExpenses(
    @GetCurrentUser('sub') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.expensesService.deleteExpenses(userId, id);
  }

  @Get('/total-expenses')
  totalExpense(@GetCurrentUser('sub') userId: number) {
    return this.expensesService.totalExpense(userId);
  }

  @Get('/groupBy')
  groupByExpenses(@GetCurrentUser('sub') userId: number) {
    return this.expensesService.groupByExpenses(userId);
  }

  @Get('/groupby-total-expense')
  groupByExpense(@GetCurrentUser('sub') userId: number) {
    return this.expensesService.groupByExpense(userId);
  }

  @Get('/categories')
  getCategories() {
    return this.expensesService.getCategories();
  }
}
