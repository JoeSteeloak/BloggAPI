import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  // Uppdaterad kod för att använda Render-porten
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); 

  console.log(`🚀 Server is running on port ${port}`);
}
bootstrap();
