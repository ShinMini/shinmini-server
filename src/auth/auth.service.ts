import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(userInfo: { email: string; password: string }): Promise<any> {
    const user = await this.userService.user(userInfo)
    if (user?.password !== userInfo.password) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, username: user.name }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async signUp(userInfo: { email: string; password: string }): Promise<any> {
    const user = await this.userService.createUser(userInfo)
    const payload = { sub: user.id, username: user.name }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
