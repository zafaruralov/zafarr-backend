import { Controller, Get, Body, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service.js';
import { MessageService } from './message.service.js';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messages: MessageService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('health') 
  getHealth() {
    return { status: 'ok' }
  }


  @Post('sendRequest')
  @UseInterceptors(NoFilesInterceptor()) 
  async sendRequest(@Body() body: { userName: string; userEmail: string; messageSummary: string }) {
    await this.messages.save(body.userName, body.userEmail, body.messageSummary);
    return { ok: true };
  }
}
