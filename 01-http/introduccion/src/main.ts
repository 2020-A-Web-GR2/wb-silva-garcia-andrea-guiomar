import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const  cookieParse = require('cookie-parser')
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  **AQUI CONFIGURACION
  * ANTES DEL APP.LISTEN
  *LENGUAJE typescript

   */

  //await app.listen(3000);
  app.use(cookieParse())
  await app.listen(3001);
}
bootstrap();
