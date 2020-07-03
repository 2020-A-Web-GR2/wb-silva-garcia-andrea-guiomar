//@Name() -> decorador


import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";
//funciona con el protocolo http
//servidor definir la URL
//divifimos el controlador con prefijos
// /juegos-http
//no se puede repetir puede aparecer conflictos
//prefix: prefijo que colocamos al controladore
//necesitamos la URL con e prfijo tenemos
//puerto, ip,protoco
//http://localhost:3001/juegos-http
//metodo
@Controller('juegos-http')
export class HttpJuegoController {
    @Get('hola')
    @HttpCode(201)
    //public es por defecto
    public holaGet(){
        //devolver error cpn throw
        throw new BadRequestException('No envia nada')
        return 'Hola GET :P'
    }

    @Post('hola')
    @HttpCode(202)
    //public es por defecto
    public holaPost(){
        return 'Hola POST :D'
    }
    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control','none')
    @Header('EPN','probando las cosas')
    //public es por defecto
    public holaDelete(){
        return 'Hola DELETE :c'
    }

    //parametros : para recinir parametro
    //http:://localhost:3001/juegos-http/paramtros-ruta/22/gestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param()
        //se puede dfinir o no los paramtros
        parametrosRuta
    ){
      console.log('paramentros',parametrosRuta)


        if(isNaN(parametrosRuta.altura) && isNaN(parametrosRuta.edad)){
            throw new BadRequestException("No son numeros")
        }else{
            const edad = Number(parametrosRuta.edad)
            const altura = Number(parametrosRuta.altura)

            return edad+altura;
        }


    }

}