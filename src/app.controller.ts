import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './auth/auth.decorator'

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/')
  testConnection(): string {
    return this.appService.testConnection()
  }
}
