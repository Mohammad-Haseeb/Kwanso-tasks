import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3001;
  await app.listen(Number(port));
  console.log('Application is running at port: ', port);
  // if (process.env.ENABLE_LOGGING?.toLowerCase() != 'true') {
  //   console.log = function () {};
  // }
}
bootstrap();
