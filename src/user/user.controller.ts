import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common'
import { UserService } from './user.service'
import { User as UserModel } from '@prisma/client'
import { Public } from 'src/auth/auth.decorator'

export interface UserDto {
  email: string
  password: string
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signupUser(@Body() userData: UserDto): Promise<UserModel> {
    return this.userService.signUp(userData)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: UserDto) {
    return this.userService.login(signInDto)
  }

  @Post('delete-account')
  async deleteUser(@Body() userData: { email: string }): Promise<UserModel> {
    return this.userService.deleteUser({ email: userData.email })
  }
}
