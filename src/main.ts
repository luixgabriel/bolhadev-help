import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as path from 'path';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ["https://bolha-dev-help-frontend.vercel.app", "http://localhost:3000"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useStaticAssets(path.join(__dirname , "../storage"));
  app.enableShutdownHooks()
  
  await app.listen(3001);
}
bootstrap();
