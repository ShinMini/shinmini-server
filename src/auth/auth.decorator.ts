import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = process.env.PUBLIC_KEY
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
