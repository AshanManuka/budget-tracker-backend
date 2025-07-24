import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { PlanService } from './plan.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlanDto } from 'src/dto/create-plan';

@Controller('plan')
@UseGuards(AuthGuard('jwt'))
export class PlanController {

    constructor( private readonly planService: PlanService  ){}


    @Post('create')
    async createPlan(@Body() planReqDto: CreatePlanDto, @Request() req){
        return await this.planService.savePlan(planReqDto, req.user);
    }

    @Get('all')
    async getAllPlans(@Request() req){
        return await this.planService.getAllPlansByUser(req.user);
    }







}
