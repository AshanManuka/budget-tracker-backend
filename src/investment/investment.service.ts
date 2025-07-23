import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createInvestmentDto } from 'src/dto/create-insvestment';
import { Model } from 'mongoose';
import { Investment, InvestmentDocument } from 'src/schemas/Investment.schema';
import { AccountsService } from 'src/accounts/accounts.service';
import { CloseInvestmentDto } from 'src/dto/close-investment';
import { IncomeService } from 'src/income/income.service';


@Injectable()
export class InvestmentService {

    constructor(
        @InjectModel(Investment.name) private investmentModel : Model<InvestmentDocument>,
        private readonly accountService: AccountsService,
        private readonly incomeService: IncomeService,
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
                interest: 0,
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
        }).sort({startDate: -1});
    }


    async closeInvestment(closeDto: CloseInvestmentDto, userPayload: {userId: string, email: string}){
        const investmentId = closeDto.investmentId;

         const updatedInvestment = await this.investmentModel.findByIdAndUpdate(
            investmentId,
            {
                clodeDate: new Date(),
                interest: closeDto.interest,
                status: "CLOSED",
            },
            { new: true }
        );

        if (!updatedInvestment) {
            throw new NotFoundException(`Investment not found with id: ${investmentId}`);
        }

        if(closeDto.interest > 0){
            const incomeDto = {
            amount: closeDto.interest,
            description: `Interest of Investment: ${updatedInvestment.investmentType || ""}`,
            date: new Date(),
            categoryId: "6876253e4cc0783283ab59cc",
        };

            await this.incomeService.createIncome(incomeDto, userPayload);

        }else{
            closeDto.interest = 0;
        }
    
        return await this.accountService.closeInvestment(userPayload.userId, updatedInvestment.amount, closeDto.interest);

    }
    

}
