import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  connectTesting(): string {
    return 'Connect Success :)'
  }
}
