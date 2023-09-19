import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common'
import { UserService } from './user.service'
import { User as UserModel } from '@prisma/client'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signupUser(@Body() userData: UserModel): Promise<UserModel> {
    return this.userService.signUp(userData)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.userService.login(signInDto)
  }

  @Post('delete-account')
  async deleteUser(@Body() userData: { email: string }): Promise<UserModel> {
    return this.userService.deleteUser({ email: userData.email })
  }
}
