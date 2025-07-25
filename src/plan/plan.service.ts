import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlanDto } from 'src/dto/create-plan';
import { Plan } from 'src/schemas/plan.schema';
import { PlanModule } from './plan.module';
import { Model} from 'mongoose';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class PlanService {

    constructor(
            @InjectModel(Plan.name) private planModel: Model<PlanModule>,
            private readonly accountService: AccountsService,
        ){}


    async savePlan(reqDto: CreatePlanDto, userPayload: {userId: string, email: string}){

        const planDto = {
            ...reqDto,
            userId: userPayload.userId
        }

        const createPlan = new this.planModel(planDto);
        createPlan.save();

        return await this.accountService.updatePlanBalance(reqDto.estimatePrice, userPayload.userId);

    }


    async getAllPlansByUser(userPayload: {userId: string, email:string}){
        return await this.planModel.find({
            userId: userPayload.userId
        });
    }


    async removePlan(planId: string, userPayload: { userId: string; email: string }) {
        const removedPlan: any = await this.planModel.findByIdAndDelete(planId).exec();

        if (!removedPlan) {
            throw new NotFoundException(`Plan with ID ${planId} not found`);
        }



        return await this.accountService.updatePlanBalance(
            -removedPlan.estimatePrice,
            userPayload.userId
        );
    }



}
