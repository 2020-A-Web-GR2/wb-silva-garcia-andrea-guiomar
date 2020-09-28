import {Module} from "@nestjs/common";
import {CartaController} from "./carta.controller";
import {CartaService} from "./carta.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CartaEntity} from "./carta.entity";

@Module(
    {
        imports:[

            TypeOrmModule.forFeature(
                [
                    CartaEntity
                ],
                'default' //nombre de la cadena de conexion
            )
        ],
        controllers:[
            CartaController
        ],
        providers:[
            CartaService
        ]
    }
)
export class CartaModule {
    
}