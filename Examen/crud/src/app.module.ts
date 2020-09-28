import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CartaEntity} from "./Carta_yuguio/carta.entity";
import {CartaModule} from "./Carta_yuguio/carta.module";

@Module({
  imports: [
      CartaModule,
    TypeOrmModule.forRoot( {
      name: 'default',//nombre de conexion
      type: 'mysql', //mysql,postgres
      host: 'localhost',//ip
      port: 3306,//puerto
      username: 'root', //usuario
      password: 'root123',//password
      database: 'yugioh',//base de datos
      entities: [
        CartaEntity
      ], //todas las entidades
      synchronize: true, //actualiza el esquema de la BD
      dropSchema: false, //eliminar los datos y el esquema de BD
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
