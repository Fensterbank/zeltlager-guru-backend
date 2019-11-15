import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';
import { existsTypeAnnotation } from '@babel/types';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  Logger.log(
    `Application started in ${process.env.NODE_ENV ||
      'development'} and listening on port ${port}`,
  );
}
bootstrap();
