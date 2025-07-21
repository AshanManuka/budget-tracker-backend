import { Controller, Post, Request, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from 'src/dto/create-income';



@Controller('income')
@UseGuards(AuthGuard('jwt'))
export class IncomeController {

    constructor(private readonly incomeService: IncomeService) {}

    @Post('create')
    async createIncome(@Body() createIncomeDto: CreateIncomeDto, @Request() req) {
        return await this.incomeService.createIncome(createIncomeDto, req.user);
    }

    @Get('all')
    async getAllIncome(@Request() req){
        return await this.incomeService.getAllIncome(req.user);
    }


}
