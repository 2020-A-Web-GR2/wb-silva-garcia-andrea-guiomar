//@Name() -> decorador


import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query, Req, Res,

} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";
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
    @Get('/pametros-consulta')
    parametrosConsulta(
        @Query()
            parametrosConsulta

    ){
        const tieneNombreApellido=parametrosConsulta.nombre && parametrosConsulta.apellido
        console.log('parametrosDeConsulta',parametrosConsulta)
        if(tieneNombreApellido){
            return  parametrosConsulta.nombre+" "+parametrosConsulta.apellido+ ':D'
        }else{
            return ':D'
        }

    }
    @Post('parametros-cuerpo')
    @HttpCode(201)
   async  parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        const mascotavalida= new MascotaCreateDto();
        mascotavalida.casada=parametrosDeCuerpo.casada
        mascotavalida.edad=parametrosDeCuerpo.edad
        mascotavalida.nombre=parametrosDeCuerpo.nombre
        mascotavalida.ligada=parametrosDeCuerpo.ligada
        mascotavalida.peso=parametrosDeCuerpo.peso

        //promesas async uso de validete intancia de clases validadas
        //colocar un try catch para usar validtae
        try{
            const errores: ValidationError[]= await  validate(mascotavalida)
            if(errores.length > 0){
                console.error('Error',errores)
                throw  new BadRequestException('Error validando')

            }else {
                return {
                    mensaje: 'Se creo correctamente'
                };
            }
        }catch (e) {
            console.error('Error',e)
            throw  new BadRequestException('Error validando')
        }

       // console.log('Paramntros de cuerpo',parametrosDeCuerpo)
       // return 'Registro creado'
    }
    //galletas
    //3 URLS
    //1 guardar una cookie insegura
    //2 guardar una cookie segur
    //2mostrar cookies
    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosconsulta,
        @Req()req,
        @Res() res
    ){
            //usamos el framework expressjs
        //instalar el cookie-parser
        //guardamos la cookie
        //propiedad si es segura o insegura
        //respuesta no funciona con return
        //optener peticion y respuesta usa dos decoradores
        //@Req  peticion
        //@Res respuesta
        //galleta recibe el domio el valor
        res.cookie(
            'galletaInsegura',//nombre
            'tengoHambre'  //valor
        )
        //no se puede usar return cuando se usa @Res()
        res.send(
            {
                mensaje: 'ok'
            }
        )
    }


}