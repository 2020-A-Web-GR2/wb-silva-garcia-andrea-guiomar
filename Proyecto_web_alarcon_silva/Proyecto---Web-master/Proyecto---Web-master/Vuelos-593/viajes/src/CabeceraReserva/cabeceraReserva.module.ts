import {Module} from "@nestjs/common";
import {CabeceraReservaService} from "./cabeceraReserva.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CabeceraReservaEntity} from "./cabeceraReserva.entity";
import {CabeceraReservaController} from "./cabeceraReserva.controller";
import {BoletosService} from "../Boletos/boletos.service";
import {UsuarioModule} from "../usuario/usuario.module";
import {VueloModule} from "../Vuelo/vuelo.module";

@Module({
    imports: [
        UsuarioModule,
        VueloModule,
        TypeOrmModule.forFeature([CabeceraReservaEntity], 'default')
    ],
    controllers: [
        CabeceraReservaController
    ],
    providers: [
        CabeceraReservaService
    ],
    exports:[
        CabeceraReservaService
    ]
})

export class CabeceraReservaModule {

}