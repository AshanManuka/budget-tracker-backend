import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly accountService: AccountsService,
    ) {}

    async createUser(createUserDto: any): Promise<any> {
        const createdUser = new this.userModel(createUserDto);
        const savedUser = await createdUser.save();
         const createdAccount = await this.accountService.createAccount({ userId: savedUser._id });
         return {
            savedUser,
            createdAccount,
            message : 'User and account created successfully',
         }
    }

async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }


}
