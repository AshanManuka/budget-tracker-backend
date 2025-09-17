import { Controller, Post, Body, Request, Get, UseGuards, Query, HttpException } from '@nestjs/common';
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



    @Post('by-keyword')
    async getByKeyword(@Body() keyword: any, @Request() req){
        return await this.expenseService.getByKeyword(keyword.word, req.user);
    }

@Get('date-range')
async getTotalExpensesByDateRange(@Request() req, @Query('start') start: string, @Query('end') end: string) {
    console.log('Start date:', start);
    console.log('End date:', end);
    console.log('User:', req.user);
    
    try {
        return await this.expenseService.getTotalExpensesByDateRange(start, end, req.user);
    } catch (error) {
        console.error('Error in date-range endpoint:', error);
        throw new HttpException('Internal server error', 500);
    }
}



}
