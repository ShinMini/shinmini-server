import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { User, Prisma } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { errorTypeClassify } from 'src/utils/error-handler/error-type-classify'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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
      if (user.password !== userInfo.password) {
        throw new UnauthorizedException({
          error: 'INVALID_CREDENTIALS',
          occurred: 'password',
        })
      }

      const payload = { sub: user.id, username: user.name }

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

  async signUp(userInfo: { email: string; password: string }): Promise<any> {
    console.log('AuthService.signUp triggered')
    try {
      const user = await this.createUser(userInfo)
      const payload = { sub: user.id, username: user.name }

      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    } catch (err) {
      return errorTypeClassify(err)
    }
  }

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
  }

  async findUsers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    })
  }
}
