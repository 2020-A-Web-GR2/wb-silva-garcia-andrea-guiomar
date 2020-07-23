import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http.module";
import {CalculadoraModule} from "./Calculadora/calculadora.module";

@Module({
  imports: [
      HttpJuegoModule,
      CalculadoraModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
