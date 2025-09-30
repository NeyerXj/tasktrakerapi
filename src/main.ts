import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const cookieParser = require('cookie-parser'); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle("Task Tracker API(with JWT)")
  .setDescription("API documentation for task tracker api!")
  .setVersion("1.0.0")
  .setContact("GitHub" , "https://github.com/NeyerXj", "ret.kol.az@gmail.com")
  .build();

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/docs', app, document)

  await app.listen(3000);
}
bootstrap();
