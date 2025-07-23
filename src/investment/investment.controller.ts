import { Controller, UseGuards, Post, Body, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvestmentService } from './investment.service';
import { createInvestmentDto } from 'src/dto/create-insvestment';
import { CloseInvestmentDto } from 'src/dto/close-investment';


@Controller('investment')
@UseGuards(AuthGuard('jwt'))
export class InvestmentController {

    constructor( private readonly investmentService: InvestmentService){}

    @Post('create-investment')
    async createInvestment(@Body() createInvestmentDto : createInvestmentDto, @Request() req){
        const userPayload: { userId: string; email: string } = req.user;
        return await this.investmentService.createInvestment(createInvestmentDto, userPayload.userId);
    }

    @Get('all')
    async getAllInvestments(@Request() req){
        return await this.investmentService.getAllInvestmentByUser(req.user);
    }

    @Post('close')
    async closeInvestment(@Request() req, @Body() closeDto: CloseInvestmentDto){
        return await this.investmentService.closeInvestment(closeDto, req.user);
    }



}
