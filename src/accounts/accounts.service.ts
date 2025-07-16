import { Injectable } from '@nestjs/common';
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

}
