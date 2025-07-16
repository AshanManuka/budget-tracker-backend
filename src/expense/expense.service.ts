import { Injectable } from '@nestjs/common';
import { Expense, ExpenseDocument } from 'src/schemas/expense.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
    ) {}

    async createExpense(createExpenseDto: any): Promise<Expense> {
        const createdExpense = new this.expenseModel(createExpenseDto);
        return createdExpense.save();
    }
}
