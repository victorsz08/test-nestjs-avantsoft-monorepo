import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          messages: Object.values(error.constraints || {}),
        }));
        return new BadRequestException({ errors: formattedErrors });
      },
    }),
  );
  app.useGlobalFilters();
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
