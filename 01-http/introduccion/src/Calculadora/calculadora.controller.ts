import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Put,
    Query,
    Res,
    Headers,
    Req,
    Param,
    Post, BadRequestException
} from "@nestjs/common";
import {NumerosCreateDto} from "./dto/numeros.create";
import {validate, ValidationError} from "class-validator";
import {Nums_divicsionCreate} from "./dto/nums_divicsion.create";

@Controller ('calculadora-andre')
export class calculadoraController {
    @Get('/suma')
    @HttpCode(200)

    async parametrosSuma(
        @Query()
            parametrosSuma,
        @Req()req,
        @Res() res
    ){

        if(req.cookies['user']!=null) {


            const n1 = parametrosSuma.n1
            const n2 = parametrosSuma.n2
            const nums = new NumerosCreateDto()
            nums.numerouno = Number(n1)
            nums.numerodos = Number(n2)



            try {
                const errores: ValidationError[] = await validate(nums)
                if (errores.length > 0) {
                    console.error('Error', errores)
                    throw  new BadRequestException('Error validando')

                } else {
                    const suma = Number(n1) + Number(n2)
                    const nuevoPuntaje=Number(req.signedCookies['Puntaje']) - Math.abs(suma)
                   if(nuevoPuntaje <= 0 ){
                      const  mensaje2= req.cookies['user']+", haz terminado tus puntos, se te han restablecido de nuevo"
                       res.cookie('Puntaje',100,{signed:true});
                      const mensaje= 'La suma es igual a:  ' +suma +'\n'+ mensaje2
                      res.send(mensaje)

                   }else{
                       res.cookie('Puntaje',nuevoPuntaje,{signed:true});
                       const mensaje= 'La suma es igual a:  ' + suma
                       res.send(mensaje)
                   }


                }
            } catch (e) {
                console.error('Error', e)
                throw  new BadRequestException('Error validando')
            }
            console.log('parametrosDeSuma', parametrosSuma, req.cookies['user'],req.signedCookies['Puntaje'])
        }else{
            throw  new BadRequestException('Necesita un usuario para usar la calculadora')
        }




    }
    @Put('/resta')
    @HttpCode(201)
    async  parametroResta(
        @Body() resta,
        @Query() parametrosResta,
        @Req()req,
        @Res() res
    ){
        if(req.cookies['user']!=null) {
            const nums = new NumerosCreateDto()
            const n2 = parametrosResta.n2
            const n1 = resta.numerouno
            nums.numerodos = Number(n2)
            nums.numerouno = Number(n1)

            try {
                const errores: ValidationError[] = await validate(nums)
                if (errores.length > 0) {
                    console.error('Error', errores)
                    throw  new BadRequestException('Error validando')

                } else {
                    const restar = Number(n1) - Number(n2)
                    const nuevoPuntaje=Number(req.signedCookies['Puntaje']) - Math.abs(restar)
                    if(nuevoPuntaje <= 0 ){
                        const  mensaje2= req.cookies['user']+", haz terminado tus puntos, se te han restablecido de nuevo"
                        res.cookie('Puntaje',100,{signed:true});
                        const mensaje= 'La resta es igual a:  ' +restar +'\n'+ mensaje2
                        res.send(mensaje)

                    }else{
                        res.cookie('Puntaje',nuevoPuntaje,{signed:true});
                        const mensaje= 'La resta es igual a:  ' + restar
                        res.send(mensaje)
                    }
                }
            } catch (e) {
                console.error('Error', e)
                throw  new BadRequestException('Error validando')
            }
            console.log('parametrosDeResta', parametrosResta, req.signedCookies['Puntaje'])
        }else{
            throw  new BadRequestException('Necesita un usuario para usar la calculadora')
        }


    }

    @Delete('/multiplicacion')
    @HttpCode(200)

    async  parametroMultiplica(
        @Body() multiplicar,
        @Req() req,
        @Headers() headers,
        @Res() res
    ){
        if(req.cookies['user']!=null) {
            const nums = new NumerosCreateDto()
            const n2 = req.headers.numerodos
            const n1 = multiplicar.numerouno
            nums.numerodos = Number(n2)
            nums.numerouno = Number(n1)


            try {
                const errores: ValidationError[] = await validate(nums)
                if (errores.length > 0) {
                    console.error('Error', errores)
                    throw  new BadRequestException('Error validando')

                } else {
                    const multi = Number(n1) * Number(n2)
                    const nuevoPuntaje=Number(req.signedCookies['Puntaje']) - Math.abs(multi)
                    if(nuevoPuntaje <= 0 ){
                        const  mensaje2= req.cookies['user']+", haz terminado tus puntos, se te han restablecido de nuevo"
                        res.cookie('Puntaje',100,{signed:true});
                        const mensaje= 'La suma es igual a:  ' +multi +'\n'+ mensaje2
                        res.send(mensaje)

                    }else{
                        res.cookie('Puntaje',nuevoPuntaje,{signed:true});
                        const mensaje= 'La suma es igual a:  ' + multi
                        res.send(mensaje)
                    }
                }
            } catch (e) {
                console.error('Error', e)
                throw  new BadRequestException('Error validando')
            }
            console.log('parametrosDeMultiplicacion', multiplicar, req.signedCookies['Puntaje'])
        }else{
            throw  new BadRequestException('Necesita un usuario para usar la calculadora')
        }



    }

    @Post('/division/uno/:numuno')
    @HttpCode(201)

    async  parametroDivide(
        @Param() divide,
        @Req() req,
        @Headers() headers,
        @Res() res
    ){
        if(req.cookies['user']!=null) {

            const nums = new Nums_divicsionCreate()

            const n1 = divide.numuno
            const n2 = req.headers.numerodos
            nums.numerouno = Number(n1)
            nums.numerodos = Number(n2)


            try {
                const errores: ValidationError[] = await validate(nums)
                if (errores.length > 0) {
                    console.error('Error', errores)
                    throw  new BadRequestException('Error validando')

                } else {
                    const dividir = Number(n1) / Number(n2)
                    const nuevoPuntaje=Number(req.signedCookies['Puntaje']) - Math.abs(dividir)
                    if(nuevoPuntaje <= 0 ){
                        const  mensaje2= req.cookies['user']+", haz terminado tus puntos, se te han restablecido de nuevo"
                        res.cookie('Puntaje',100,{signed:true});
                        const mensaje= 'La suma es igual a:  ' +dividir +'\n'+ mensaje2
                        res.send(mensaje)

                    }else{
                        res.cookie('Puntaje',nuevoPuntaje,{signed:true});
                        const mensaje= 'La suma es igual a:  ' + dividir
                        res.send(mensaje)
                    }
                }
            } catch (e) {
                console.error('Error', e)
                throw  new BadRequestException('Error validando')
            }
            console.log('parametrosDivide', n1, n2, req.signedCookies['Puntaje'])

        }else{
            throw  new BadRequestException('Necesita un usuario para usar la calculadora')
        }


    }
    @Get('Guardar')
    guardarCookieInsegura(
        @Query() paramatro,
        @Req()req,
        @Res() res
    ) {
        res.cookie(
           'user' ,//nombre
            paramatro.nombre //valor
        )
        res.cookie('Puntaje',100,{signed:true});
        res.send(
            {
                mensaje: 'CALCULADORA ANDRE :D...'
            }
        )
    }
    // COOKIE FIRMADA PUNTAJE!!!!!

  /*  @Get('puntaje')
    guardarCookieFirmada(
        @Res() res,
        @Req() req
    ){
        res.cookie('Puntaje',100,{signed:true});
        const  mensaje={
            mensaje:'ok'
        };
        res.send(mensaje)
     //   const  mensaje={
      //      mensaje:req.cookies['user']+", haz terminado tus puntos, se te han restablecido de nuevo"
       // };
       // if()
       // res.send(mensaje)
    }
*/


}