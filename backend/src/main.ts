import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  console.log(process.env.FRONTEND_URL);
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Replace with your frontend URL
    methods: 'GET, POST, PUT, DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
