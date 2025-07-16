import { Controller, Post, Body } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from '../dto/create-expense';
import { Expense } from 'src/schemas/expense.schema';

@Controller('expense')
export class ExpenseController {

    constructor(private readonly expenseService: ExpenseService) {}

    @Post('create')
    async create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
        return this.expenseService.createExpense(createExpenseDto);
    }



}
