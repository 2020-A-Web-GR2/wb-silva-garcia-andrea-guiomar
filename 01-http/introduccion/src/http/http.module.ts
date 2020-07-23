import {Module} from "@nestjs/common";
import {HttpJuegoController} from "./http.controller";


@Module({
    imports:[],
    controllers:[
        HttpJuegoController
    ],
    providers:[]
})

export class HttpJuegoModule {

}