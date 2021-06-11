import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './util/Filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger Documentation auto-setup
  const config = new DocumentBuilder()
    .setTitle('NestAPI')
    .setDescription('Version 1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  //End of Swagger Setup

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
