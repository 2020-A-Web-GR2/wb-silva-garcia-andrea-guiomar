import {Module} from "@nestjs/common";
import {calculadoraController} from "./calculadora.controller";

@Module({
    imports:[],
    controllers:[
        calculadoraController
],
    providers:[]
})
export class CalculadoraModule {

}