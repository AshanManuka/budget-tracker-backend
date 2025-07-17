import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from 'src/dto/create-income';
import { Income, IncomeDocument } from 'src/schemas/income.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class IncomeService {

    constructor(
        @InjectModel(Income.name) private incomeModel: Model<IncomeDocument>,
        private readonly accountService: AccountsService,
    ){}

    
    async createIncome(createIncomeDto: CreateIncomeDto, userPayload: { userId: string; email: string } ) {
         const fullIncome = {
            ...createIncomeDto,
            userId : userPayload.userId
         }
        const createdIncome = new this.incomeModel(fullIncome);
         createdIncome.save();

        return await this.accountService.increaseBalance(createIncomeDto.amount, userPayload.userId);

    }
}
