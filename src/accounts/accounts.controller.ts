import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts.service';

@Controller('accounts')
@UseGuards(AuthGuard('jwt'))
export class AccountsController {

    constructor( private readonly accountService: AccountsService){}

    @Get("current-balance")
    async getAccountBalance(@Request() req){
        return await this.accountService.getAccountBalance(req.user);
    }

}
