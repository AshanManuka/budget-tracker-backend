import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';

@Injectable()
export class AccountsService {

    constructor(
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    ) {}

    
    async createAccount({ userId }: { userId: any }): Promise<any> {
        const accountDto = {
            mainBalance: 0,
            savingsBalance: 0,
            creditBalance: 0,
            investmentBalance: 0,
            userId : userId.toString(),
        };

        const createdAccount = await this.accountModel.create(accountDto);
        return createdAccount;
    }
    

    async increaseBalance(amount: number, userId: string) {
       
        const updatedAccount = await this.accountModel.findOneAndUpdate(
            { userId: userId },
            { $inc: { mainBalance: amount, savingsBalance: amount } },
            { new: true }
        );

        if (!updatedAccount) {
            throw new NotFoundException('Account not found for the given user');
        }

        return {
            message: 'Main balance updated successfully',
            account: updatedAccount
        };
    }

    async deductForInvestment(uId: string, amount: number) {
        const updatedAccount = await this.accountModel.findOneAndUpdate(
            { userId: uId },
            { 
            $inc: { 
                savingsBalance: -amount, 
                investmentBalance: amount 
            }
            },
            { new: true }
        );

        if (!updatedAccount) {
            throw new NotFoundException('Account not found for the given user');
        }

        return {
            message: 'Balances updated successfully',
            account: updatedAccount
        };
    }



    async getAccountBalance(uId: string): Promise<AccountDocument> {
        const account = await this.accountModel.findOne({ userId: uId });
        if (!account) {
            throw new NotFoundException('Account not found for this user');
        }
        return account;
    }

    async addToCreditBalance(amount:number, uId: string){
        const updatedAccount = await this.accountModel.findOneAndUpdate(
            {userId: uId},
            {
                $inc: {creditBalance: amount} 
            },
            {new: true}
        );

        if (!updatedAccount) {
            throw new NotFoundException('Account not found for the given user');
        }

        return "Credit updated successfully";
    }

    async deductFromCreditBalance(amount: number, uId: string){
        const updatedAccount = await this.accountModel.findOneAndUpdate(
            {userId: uId},
            {
                $inc: {creditBalance: -amount} 
            },
            {new: true}
        );

        if (!updatedAccount) {
            throw new NotFoundException('Account not found for the given user');
        }

        return "Credit updated successfully";

    }


    
    async closeInvestment(uId: string, investedAmount: number, interest: number) {
    return await this.accountModel.findOneAndUpdate(
        { userId: uId },
        {
        $inc: {
            savingsBalance: investedAmount,
            investmentBalance: -investedAmount,
        },
        },
        { new: true }
    );
    }






}
