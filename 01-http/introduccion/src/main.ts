import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const  cookieParse = require('cookie-parser')
async function bootstrap() {
  const app = await NestFactory.create(AppModule)as any;
  const express=require('express');

  /*
  **AQUI CONFIGURACION
  * ANTES DEL APP.LISTEN
  *LENGUAJE typescript
   */
  //await app.listen(3000);
  app.use(cookieParse('Me gustan las Poliburguers'))
  app.set('view engine','ejs');
  app.use(express.static('publico'))
  //colocar un servidor web estatico



  await app.listen(3001);
}
bootstrap();
