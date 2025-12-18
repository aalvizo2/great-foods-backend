import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Documentaremos las apis con swagger
  const config = new DocumentBuilder()
    .setTitle('Great Foods')
    .setDescription('Apis documentadas App de reservas')
    .setVersion('V0.001')
    .addServer('api/v1')
    .build()
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Configuramos un prefijo
  app.setGlobalPrefix('api/v1');

  //Configuramos cors y lo dejamos abierto 
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
