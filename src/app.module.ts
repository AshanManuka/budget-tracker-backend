import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './category/category.module';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { AccountsModule } from './accounts/accounts.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { IncomeController } from './income/income.controller';
import { IncomeService } from './income/income.service';
import { IncomeModule } from './income/income.module';
import { InvestmentModule } from './investment/investment.module';
import { CreditsModule } from './credits/credits.module';


@Module({
  controllers: [AppController, AuthController],
  providers: [AppService],

  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/expense-db'),
    UserModule,
    ExpenseModule,
    CategoryModule,
    AccountsModule,
    AuthModule,
    IncomeModule,
    InvestmentModule,
    CreditsModule,
  ],
})
export class AppModule {}
