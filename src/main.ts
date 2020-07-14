import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { AppModule } from './app.module';
import config from './config';

const { PORT, PGADMIN_PORT, NODE_ENV } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());

  if (NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Cars example')
      .setDescription('The cars API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    if (NODE_ENV !== 'production') {
      console.log(`Swagger is running on http://localhost:${PORT}/api`);
      console.log(`pgAdmin is running on http://localhost:${PGADMIN_PORT}`);
    }
  });
}
bootstrap();
