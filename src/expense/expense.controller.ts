import { Controller, Post, Body, Request, UseFilters, UseGuards } from '@nestjs/common';
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



}
