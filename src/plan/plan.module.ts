import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from 'src/schemas/plan.schema';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  providers: [PlanService],
  controllers: [PlanController],
  imports: [
      MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
      AccountsModule,
  ],
})
export class PlanModule {}
