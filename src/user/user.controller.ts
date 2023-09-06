import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { User as UserModel } from '@prisma/client'

@Controller('shinmini-homepage/us-central1/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(@Body() userData: UserModel): Promise<UserModel> {
    return this.userService.createUser(userData)
  }

  @Post('delete')
  async deleteUser(@Body() userData: { email: string }): Promise<UserModel> {
    return this.userService.deleteUser({ email: userData.email })
  }
}
