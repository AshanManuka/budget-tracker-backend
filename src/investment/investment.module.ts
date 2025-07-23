import { Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Investment, InvestmentSchema } from 'src/schemas/Investment.schema';
import { AccountsModule } from 'src/accounts/accounts.module';
import { IncomeModule } from 'src/income/income.module';

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService],
  imports: [
    MongooseModule.forFeature([{name: Investment.name, schema: InvestmentSchema}]),
    AccountsModule,
    IncomeModule
  ]
})
export class InvestmentModule {}

