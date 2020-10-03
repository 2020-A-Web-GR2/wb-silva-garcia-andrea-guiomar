import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PagosEntity} from "./pagos.entity";
import {PagosService} from "./pagos.service";
import {PagosController} from "./pagos.controller";
import {BoletosModule} from "../Boletos/boletos.module";
import {UsuarioModule} from "../usuario/usuario.module";
import {VueloModule} from "../Vuelo/vuelo.module";
import {AsientoModule} from "../Asientos/asiento.module";
import {BoletosService} from "../Boletos/boletos.service";

@Module(
    {
        imports:[
            BoletosModule,
            VueloModule,
            AsientoModule,
            UsuarioModule,

            TypeOrmModule.forFeature([PagosEntity], 'default')
        ],
        controllers: [
            PagosController
        ],
        providers:[
            PagosService
        ],
        exports:[
            PagosService
        ]
    }
)

export class PagosModule {

}