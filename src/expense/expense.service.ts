import { Injectable } from '@nestjs/common';
import { Expense, ExpenseDocument } from 'src/schemas/expense.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpenseDto } from 'src/dto/create-expense';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
        private readonly accoutService: AccountsService,
    ) {}



    async createExpense(createExpenseDto: CreateExpenseDto, uId: string) {
        const fullExpence = {
            ...createExpenseDto,
            userId: uId,
        }
        const createdExpense = new this.expenseModel(fullExpence);
        await createdExpense.save();
        
        return await this.accoutService.increaseBalance(-createExpenseDto.amount, uId);
    }

    async allExpense(userPayload: {userId: string, email: string}){
        return await this.expenseModel.find({userId: userPayload.userId}).sort({date: -1});
    }
}
