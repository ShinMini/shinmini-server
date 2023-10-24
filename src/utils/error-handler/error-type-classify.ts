import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

function destructuredError(error: PrismaClientKnownRequestError) {
  const { code, meta } = error

  const target = meta?.target
  const occurred = Array.isArray(target) ? target.join('.') : target

  console.group('errorTypeClassify')
  console.log('code:', code)
  console.log('name:', occurred)
  console.groupEnd()

  return {
    code,
    occurred,
  }
}

export const errorTypeClassify = (error: any) => {
  if (!(error instanceof PrismaClientKnownRequestError)) {
    return {
      type: 'UNKNOWN',
      occurred: 'UNKNOWN',
      message: (error.message as string) || 'Un caught error',
    }
  }

  const { code, occurred } = destructuredError(error)

  console.group('errorTypeClassify')
  console.log('code:', code)
  console.log('occurred:', occurred)
  console.groupEnd()

  switch (code) {
    case 'P2002':
      return {
        type: 'DUPLICATE_KEY',
        occurred,
        message: 'Duplicate key error',
      }
    case 'P2025':
      return {
        type: 'FOREIGN_KEY_CONSTRAINT',
        occurred,
        message: 'Foreign key constraint error',
      }
    default:
      return {
        type: code,
        occurred: error.name,
        message: error.message,
      }
  }
}
