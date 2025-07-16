import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../schemas/account.schema';

@Module({
    controllers: [AccountsController],
    providers: [AccountsService],
    exports: [AccountsService],
    imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])]
})
export class AccountsModule {}
