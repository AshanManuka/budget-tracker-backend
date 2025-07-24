import { Module } from '@nestjs/common';
import { CreditsController } from './credits.controller';
import { CreditsService } from './credits.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Credit, CreditSchema } from 'src/schemas/credit.schema';
import { AccountsModule } from 'src/accounts/accounts.module';
import { ExpenseModule } from 'src/expense/expense.module';
import { IncomeModule } from 'src/income/income.module';
import { InstallmentModule } from 'src/installment/installment.module';

@Module({
  controllers: [CreditsController],
  providers: [CreditsService],
  imports: [
    MongooseModule.forFeature([{name: Credit.name, schema: CreditSchema}]),
    ExpenseModule,
    AccountsModule,
    IncomeModule,
    InstallmentModule,
  ]
})
export class CreditsModule {}

