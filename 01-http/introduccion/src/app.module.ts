import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http.module";
import {CalculadoraModule} from "./Calculadora/calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
      HttpJuegoModule,
      CalculadoraModule,
      UsuarioModule,
     TypeOrmModule.forRoot({
          name: 'default',//nombre de conexion
          type: 'mysql', //mysql,postgres
          host: 'localhost',//ip
          port: 3306,//puerto
          username: 'root', //usuario
          password: 'root123',//password
          database: 'test',//base de datos
          entities: [
            UsuarioEntity
          ], //todas las entidades
          synchronize: true, //actualiza el esquema de la BD
          dropSchema: false, //eliminar los datos y el esquema de BD
      }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
