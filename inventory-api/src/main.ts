import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  configureSwagger(app);
  const port = parseInt(process.env.PORT) || 8000;

  await app.listen(port);
  console.log(`[INVENTORY-API] running on port ${port}`);
}

function configureSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('inventory-back-API')
    .setDescription('Api para administración de inventarios para tiendas.')
    .setVersion('1.0')
    .addTag('#mabenuz22')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
}

bootstrap();
