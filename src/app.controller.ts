import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './auth/auth.decorator'

@Controller('shinmini-homepage/us-central1/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('test')
  connectTesting(): string {
    return this.appService.connectTesting()
  }
}
