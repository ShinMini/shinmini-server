import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { errorTypeClassify } from 'src/utils/error-handler/error-type-classify'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  // async signIn(userInfo: { email: string; password: string }): Promise<any> {
  //   try {
  //     const user = await this.userService.user(userInfo)
  //     if (!user) {
  //       throw new UnauthorizedException({
  //         error: 'INVALID_CREDENTIALS',
  //         occurred: 'email',
  //       })
  //     }
  //     if (user.password !== userInfo.password) {
  //       throw new UnauthorizedException({
  //         error: 'INVALID_CREDENTIALS',
  //         occurred: 'password',
  //       })
  //     }

  //     const payload = { sub: user.id, username: user.name }

  //     return {
  //       access_token: await this.jwtService.signAsync(payload),
  //     }
  //   } catch (err) {
  //     console.error('AuthService.signIn triggered!!')
  //     console.error(err)
  //     return err
  //   }
  // }

  // async signUp(userInfo: { email: string; password: string }): Promise<any> {
  //   console.log('AuthService.signUp triggered')
  //   try {
  //     const user = await this.userService.createUser(userInfo)
  //     const payload = { sub: user.id, username: user.name }

  //     return {
  //       access_token: await this.jwtService.signAsync(payload),
  //     }
  //   } catch (err) {
  //     return errorTypeClassify(err)
  //   }
  // }
}
