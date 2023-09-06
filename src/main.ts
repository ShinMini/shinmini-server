import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:3000',
        'https://shinmini.com',
        'https://shinmini-homepage.web.app',
        'https://shinmini-homepage.firebaseapp.com',
      ],
      credentials: true,
    },
  })

  await app.listen(process.env.PORT || 3000)
}
bootstrap().then(() =>
  console.log(
    `Application is successfully running on ${process.env.PORT || 3000} port`
  )
)
