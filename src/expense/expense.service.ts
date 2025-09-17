import { Injectable } from '@nestjs/common';
import { Expense, ExpenseDocument } from 'src/schemas/expense.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpenseDto } from 'src/dto/create-expense';
import { AccountsService } from 'src/accounts/accounts.service';
import { startOfMonth, endOfMonth } from 'date-fns';

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

    async getCurrentMonthTotal(userPayload: { userId: string; email: string }) {
        const start = startOfMonth(new Date());
        const end = endOfMonth(new Date());

        const result = await this.expenseModel.aggregate([
            {
            $match: {
                date: { $gte: start, $lte: end },
                userId: userPayload.userId,
            },
            },
            {
            $group: {
                _id: null,
                total: { $sum: '$amount' },
            },
            },
        ]);

        return { total: result[0]?.total || 0 };
    }



    async getByDateRange(
        ranges: { startDate: Date; endDate: Date },
        userPayload: { userId: string; email: string }
        ) {
        return await this.expenseModel.find({
            userId: userPayload.userId,
            date: {
            $gte: ranges.startDate,
            $lte: ranges.endDate
            }
        });
    }


    async getByKeyword(keyword: string, userPayload: { userId: string; email: string }) {
        return await this.expenseModel.find({
            userId: userPayload.userId,
            reason: { $regex: keyword, $options: "i" }  // "i" = case-insensitive
        }).sort({ date: -1 });
    }

    async getTotalExpensesByDateRange(start, end, userPayload: { userId: string; email: string }) {
        return await this.expenseModel.aggregate([
            {
                $match: {
                    date: { $gte: new Date(start), $lte: new Date(end) },
                    userId: userPayload.userId,
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' },
                },
            },
        ]);
    }




}
