import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AsientoEntity} from "./asiento.entity";
import {AsientoService} from "./asiento.service";
import {AsientoController} from "./asiento.controller";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature([AsientoEntity], 'default'),

        ], controllers: [
            AsientoController
        ],
        providers:[
            AsientoService
        ],
        exports:[
            AsientoService
        ]

    })
export class AsientoModule {

}