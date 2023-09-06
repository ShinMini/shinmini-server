import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { Public } from './auth.decorator'

@Controller('shinmini-homepage/us-central1/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(signInDto)
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: { email: string; password: string }) {
    return this.authService.signUp(signUpDto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user
  }
}
