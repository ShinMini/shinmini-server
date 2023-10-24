import { Injectable, UnauthorizedException } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

import { errorTypeClassify } from 'src/utils/error-handler/error-type-classify'
import Encrypt from 'src/utils/error-handler/crypto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private encrypt: Encrypt
  ) {}

  async login(userInfo: { email: string; password: string }): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: userInfo.email,
        },
      })
      if (!user) {
        throw new UnauthorizedException({
          error: 'INVALID_CREDENTIALS',
          occurred: 'email',
        })
      }
      const encryptedPassword = this.encrypt
        .encrypting(userInfo.password)
        .toString()

      if (user.password !== encryptedPassword) {
        throw new UnauthorizedException({
          error: 'INVALID_CREDENTIALS',
          occurred: 'password',
        })
      }

      const payload = { sub: user.id, userEmail: user.email }

      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    } catch (err) {
      console.error('AuthService.signIn triggered!!')
      console.error(err)
      if (err instanceof UnauthorizedException) {
        console.log('unauthorized')
        throw err
      }
      return err
    }
  }

  async register(userInfo: { email: string; password: string }): Promise<any> {
    try {
      const encryptedPassword = this.encrypt
        .encrypting(userInfo.password)
        .toString()
      const encryptedUserInfo = {
        email: userInfo.email,
        password: encryptedPassword,
      }

      const user = await this.userService.createUser(encryptedUserInfo)
      const payload = { sub: user.id, userEmail: user.email }

      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    } catch (err) {
      return errorTypeClassify(err)
    }
  }
}
