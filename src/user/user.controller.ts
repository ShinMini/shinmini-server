import {
  Controller,
  Post,
  Body,
  Request,
  HttpStatus,
  HttpCode,
  Get,
  Req,
} from '@nestjs/common'
import { UserService } from './user.service'
import { User as UserModel } from '@prisma/client'

export type ResponseDeleteUser =
  | {
      success: true
      message: string
    }
  | {
      success: false
      error: {
        type: string
        occurred: unknown
        message: string
      }
    }

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('Profile')
  getProfile(@Request() req: { user: UserModel }) {
    return this.userService.getProfile(req?.user)
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('delete-account')
  async deleteUser(
    @Req() req: { user: UserModel }
  ): Promise<ResponseDeleteUser> {
    return this.userService.deleteUser(req?.user)
  }
}
