import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createInvestmentDto } from 'src/dto/create-insvestment';
import { Model } from 'mongoose';
import { Investment, InvestmentDocument } from 'src/schemas/Investment.schema';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class InvestmentService {

    constructor(
        @InjectModel(Investment.name) private investmentModel : Model<InvestmentDocument>,
        private readonly accountService: AccountsService
    ){}

   async createInvestment(investmentDto: createInvestmentDto, uId: string) {
        const account = await this.accountService.getAccountBalance(uId);

        if(account.savingsBalance < investmentDto.amount){
            return "Not Enough Balance";
        }else{
            const fullInvestment = {
                ...investmentDto,
                userId: uId,
                clodeDate: null,
                status: "ACTIVE",
            }

            const investment = new this.investmentModel(fullInvestment);
            const savedInvestment = investment.save();

            return await this.accountService.deductForInvestment(uId, investmentDto.amount)
        }
    }

    async getAllInvestmentByUser(userPayload: {userId: string, email: string}){
        return await this.investmentModel.find({
            userId: userPayload.userId
        }).sort({date: -1});
    }
    

}
