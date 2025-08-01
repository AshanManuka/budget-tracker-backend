import { Controller, Post, Body, Request, Get, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from '../dto/create-expense';
import { Expense } from 'src/schemas/expense.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('expense')
@UseGuards(AuthGuard('jwt'))
export class ExpenseController {

    constructor(private readonly expenseService: ExpenseService) {}

    @Post('create')
    async create(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
        const userPayload: { userId: string; email: string } = req.user;
        return this.expenseService.createExpense(createExpenseDto, userPayload.userId);
    }

    @Get('all')
    async getAllExpense(@Request() req){
        return this.expenseService.allExpense(req.user);
    }

    @Get('current-month-total')
    async getCurrentMonthTotalExpense(@Request() req){
        return this.expenseService.getCurrentMonthTotal(req.user);
    }

    @Get('date-range')
    async getByDateRange(@Body() dateRange: any, @Request() req){
        return await this.expenseService.getByDateRange(dateRange, req.user);
    }

    @Post('by-keyword')
    async getByKeyword(@Body() keyword: any, @Request() req){
        return await this.expenseService.getByKeyword(keyword.word, req.user);
    }



}
