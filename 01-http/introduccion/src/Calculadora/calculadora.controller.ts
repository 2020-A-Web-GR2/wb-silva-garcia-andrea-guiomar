import {Body, Controller, Delete, Get, Header, HttpCode, Put, Query, Res,Headers} from "@nestjs/common";
import {NumerosCreateDto} from "./dto/numeros.create";

@Controller ('calculadora-andre')
export class calculadoraController {
    @Get('/suma')
    @HttpCode(200)
    parametrosSuma(
        @Query()
            parametrosSuma

    ){
        const n1=parametrosSuma.n1
        const n2= parametrosSuma.n2
        const  suma =n1+n2
        console.log('parametrosDeSuma',parametrosSuma)

            return  'La suma es igual a '+suma


    }
    @Put('/resta')
    @HttpCode(201)
    async  parametroResta(
        @Body() resta,
        @Query() parametrosResta
    ){

        const n1= new NumerosCreateDto()
        const n2= parametrosResta.n2

        const  restar =n1.numerouno=resta.numerouno-n2
        console.log('parametrosDeResta',parametrosResta)

        return  'La resta es igual a '+restar


    }

    @Delete('/multiplicacion')
    @HttpCode(200)

    async  parametroMultiplica(
        @Body() multiplicar,
        @Res() res,
        @Headers() headers
    ){

        const n1= new NumerosCreateDto()
        const  n2= res.header('numdos',6)

        const  multi =n1.numerouno=multiplicar.numerouno*n2
        console.log('parametrosDeResta',multiplicar, headers, multi)

        return  'La multiplicacion es igual a '+multi


    }

}