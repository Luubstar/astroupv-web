import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    ['/admin', '/admin-json'],
    basicAuth({
        challenge: true,
        users: {
          AstroUPV : "457r0n0m14UpV",
        },
    }),);

  console.log(join(__dirname, '..', '..', 'public'));
  app.useStaticAssets(join(__dirname, '..','..', 'public'));

  const config = new DocumentBuilder()
  .setTitle('AstroUPV API')
  .setDescription('API de AstroUPV')
  .setVersion('0.1')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('admin', app, document);

  await app.listen(8080);

}
bootstrap();