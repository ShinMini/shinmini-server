import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { User, Prisma, Profile } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { errorTypeClassify } from 'src/utils/error-handler/error-type-classify'
import Encrypt from 'src/utils/error-handler/crypto'
import { ResponseDeleteUser } from './user.controller'
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private encrypt: Encrypt
  ) {}

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

  async getProfile(user: User): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.prisma.user.create({
        data,
      })
    } catch (error) {
      console.error('UserService.createUser triggered!!')
      console.error(error)
    }
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

  async deleteUser(
    where: Prisma.UserMaxAggregateOutputType
  ): Promise<ResponseDeleteUser> {
    try {
      await this.prisma.user.delete({
        where,
      })
      return {
        success: true,
        message: 'User deleted successfully',
      }
    } catch (err: unknown) {
      console.error('UserService.deleteUser triggered!!')
      console.error(err)
      const error = errorTypeClassify(err)
      return {
        success: false,
        error,
      }
    }
  }
}
