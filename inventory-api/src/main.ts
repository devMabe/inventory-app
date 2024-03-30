import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = parseInt(process.env.PORT) || 8000;

  await app.listen(port);
  console.log(`[INVENTORY-API] running on port ${port}`);
}
bootstrap();
