import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCreditDto } from 'src/dto/create-credit';

@Controller('credits')
@UseGuards(AuthGuard('jwt'))
export class CreditsController {

    constructor(
        private readonly creditsService: CreditsService
    ){}

    @Post('create-credit')
    async createCredit(@Body() creditDto: CreateCreditDto, @Request() req){
        return await this.creditsService.createCredit(creditDto, req.user);
    }

    @Get('all-credit')
    async getAllCredit(@Request() req){
        return await this.creditsService.getAllCreditByUser(req.user);
    }

    @Post('settle-loan')
        async settleLoan(@Body() body: { loanId: string }, @Request() req) {
        return await this.creditsService.settleLoan(body.loanId, req.user);
    }

    @Post('settle-installment')
    async settleInstallment(@Body() reqBody: {lId: string, installmentAmount: number}, @Request() req){
        return await this.creditsService.settleInstallment(reqBody.lId, reqBody.installmentAmount, req.user);
    }




}
