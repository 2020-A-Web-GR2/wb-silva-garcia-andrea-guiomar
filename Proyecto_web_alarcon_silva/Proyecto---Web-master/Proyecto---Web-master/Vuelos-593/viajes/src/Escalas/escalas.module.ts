import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EscalasService} from "./escalas.service";
import {EscalasEntity} from "./escalas.entity";
import {EscalasController} from "./escalas.controller";


@Module(
    {
        imports:[
            TypeOrmModule.forFeature([EscalasEntity], 'default')
        ],
        controllers: [
        EscalasController
        ],
        providers:[
            EscalasService
        ],
        exports:[
            EscalasService
        ]
    }
)
export class EscalasModule {

}