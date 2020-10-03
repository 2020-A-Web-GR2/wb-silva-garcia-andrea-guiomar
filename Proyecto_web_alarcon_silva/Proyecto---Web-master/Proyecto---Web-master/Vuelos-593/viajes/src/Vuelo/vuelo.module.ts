import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VueloService} from "./vuelo.service";
import {VueloEntity} from "./vuelo.entity";
import {VueloController} from "./vuelo.controller";
import {AsientoModule} from "../Asientos/asiento.module";
import {EscalasModule} from "../Escalas/escalas.module";
import {UsuarioModule} from "../usuario/usuario.module";

@Module(
    {
        imports:[

            EscalasModule,
            AsientoModule,
            UsuarioModule,
            TypeOrmModule.forFeature([VueloEntity], 'default')
        ],
        controllers: [
                VueloController
        ],
        providers:[
            VueloService
        ],
        exports: [
            VueloService
        ]
    }
)

export class VueloModule {

}