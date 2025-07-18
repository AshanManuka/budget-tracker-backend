import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from '../schemas/expense.schema';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    AccountsModule
  ],
})
export class ExpenseModule {}
