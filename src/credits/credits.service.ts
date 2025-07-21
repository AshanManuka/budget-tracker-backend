import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountsService } from 'src/accounts/accounts.service';
import { Credit, CreditDocument } from 'src/schemas/credit.schema';
import { Model } from 'mongoose';
import { CreateCreditDto } from 'src/dto/create-credit';
import { ExpenseService } from 'src/expense/expense.service';
import { CreateExpenseDto } from 'src/dto/create-expense';

@Injectable()
export class CreditsService {

    constructor(
        @InjectModel(Credit.name) private creditModel: Model<CreditDocument>,
        private readonly expenseService: ExpenseService,
        private readonly accountService: AccountsService,
    ){}


    async createCredit(creditDto: CreateCreditDto, userPayload: {email: string, userId: string}){
        const fullCredit = {
            ...creditDto,
            userId: userPayload.userId,
        }

        const createdCredit = new this.creditModel(fullCredit);
        createdCredit.save();

        return await this.accountService.addToCreditBalance(creditDto.creditAmount, userPayload.userId);
    }


    async getAllCreditByUser(userPayload: {email: string, userId: string}){
        return this.creditModel.find({
            userId: userPayload.userId,
            status: 'Not Settled'
        })
    }


    async settleLoan(loanId: string, userPayload: { email: string; userId: string }) {
        const updatedLoan = await this.creditModel.findByIdAndUpdate(
            loanId,
            { status: "Settled" },
            { new: true }
        );

        if (!updatedLoan) {
            console.log("loan not found", loanId);
            throw new NotFoundException("Loan not found");
        }

        const createExpenseDto = {
            amount: updatedLoan.creditAmount,
            reason: "Settled loan that was taken from " + updatedLoan.fromName,
            date: new Date(),
            categoryId: "6879d18224aab277e746a7ac"
        };

        await this.expenseService.createExpense(createExpenseDto, userPayload.userId);
        await this.accountService.deductFromCreditBalance(updatedLoan.creditAmount, userPayload.userId);
    }





}
