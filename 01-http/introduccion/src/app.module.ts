import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http.module";
import {CalculadoraModule} from "./Calculadora/calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
      HttpJuegoModule,
      CalculadoraModule,
      UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
