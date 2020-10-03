import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {BoletosEntity} from "./boletos.entity";
import {BoletosService} from "./boletos.service";
import {BoletosController} from "./boletos.controller";
import {AsientoService} from "../Asientos/asiento.service";
import {VueloService} from "../Vuelo/vuelo.service";
import {AsientoModule} from "../Asientos/asiento.module";
import {VueloModule} from "../Vuelo/vuelo.module";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([BoletosEntity], 'default'),
            AsientoModule,
            VueloModule
        ],
        controllers: [
            BoletosController
        ],
        providers:[
            BoletosService
        ],
        exports:[
            BoletosService
        ]
    }
)


export class BoletosModule {

}