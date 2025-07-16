import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('public')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/welcome')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/status')
  getAppStatus(): any {
    return {
      status: 'running',
      timestamp: new Date().toISOString(),
      message: 'App is running smoothly'
    };
  }


}
