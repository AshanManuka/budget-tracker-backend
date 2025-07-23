import { Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Income, IncomeSchema } from '../schemas/income.schema';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
    controllers: [IncomeController],
    providers: [IncomeService],
    exports: [IncomeService],
    imports: [
        MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }]),
        AccountsModule,
    ],
})
export class IncomeModule {}
