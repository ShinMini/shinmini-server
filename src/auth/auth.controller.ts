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
// import { Public } from './auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: { email: string; password: string }) {
  //   return this.authService.signIn(signInDto)
  // }

  // @Public()
  // @HttpCode(HttpStatus.CREATED)
  // @Post('signup')
  // signUp(@Body() signUpDto: { email: string; password: string }) {
  //   return this.authService.signUp(signUpDto)
  // }

  @UseGuards(AuthGuard)
  @Get('Profile')
  getProfile(@Request() req: any) {
    return req.user
  }
}
