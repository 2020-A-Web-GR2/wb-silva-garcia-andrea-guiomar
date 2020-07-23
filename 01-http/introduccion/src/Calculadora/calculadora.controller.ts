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
        @Req()req
    ){

        if(req.cookies['user']!=null) {


            const n1 = parametrosSuma.n1
            const n2 = parametrosSuma.n2
            const nums = new NumerosCreateDto()
            nums.numerouno = Number(n1)
            nums.numerodos = Number(n2)

            console.log('parametrosDeSuma', parametrosSuma, req.cookies['user'])

            try {
                const errores: ValidationError[] = await validate(nums)
                if (errores.length > 0) {
                    console.error('Error', errores)
                    throw  new BadRequestException('Error validando')

                } else {
                    const suma = Number(n1) + Number(n2)
                    return {
                        mensaje: 'La suma es igual a:  ' + suma
                    };
                }
            } catch (e) {
                console.error('Error', e)
                throw  new BadRequestException('Error validando')
            }
        }else{
            throw  new BadRequestException('Necesita un usuario para usar la calculadora')
        }



    }
    @Put('/resta')
    @HttpCode(201)
    async  parametroResta(
        @Body() resta,
        @Query() parametrosResta,
        @Req()req
    ){
        if(req.cookies['user']!=null) {
            const nums = new NumerosCreateDto()
            const n2 = parametrosResta.n2
            const n1 = resta.numerouno
            nums.numerodos = Number(n2)
            nums.numerouno = Number(n1)
            console.log('parametrosDeResta', parametrosResta)
            try {
                const errores: ValidationError[] = await validate(nums)
                if (errores.length > 0) {
                    console.error('Error', errores)
                    throw  new BadRequestException('Error validando')

                } else {
                    const restar = Number(n1) - Number(n2)
                    return {
                        mensaje: 'La resta es igual a ' + restar
                    };
                }
            } catch (e) {
                console.error('Error', e)
                throw  new BadRequestException('Error validando')
            }
        }else{
            throw  new BadRequestException('Necesita un usuario para usar la calculadora')
        }


    }

    @Delete('/multiplicacion')
    @HttpCode(200)

    async  parametroMultiplica(
        @Body() multiplicar,
        @Req() req,
        @Headers() headers
    ){
        if(req.cookies['user']!=null) {
            const nums = new NumerosCreateDto()
            const n2 = req.headers.numerodos
            const n1 = multiplicar.numerouno
            nums.numerodos = Number(n2)
            nums.numerouno = Number(n1)

            console.log('parametrosDeResta', multiplicar, headers)
            try {
                const errores: ValidationError[] = await validate(nums)
                if (errores.length > 0) {
                    console.error('Error', errores)
                    throw  new BadRequestException('Error validando')

                } else {
                    const multi = Number(n1) * Number(n2)
                    return {
                        mensaje: 'La multiplicacion es igual a ' + multi
                    };
                }
            } catch (e) {
                console.error('Error', e)
                throw  new BadRequestException('Error validando')
            }
        }else{
            throw  new BadRequestException('Necesita un usuario para usar la calculadora')
        }



    }

    @Post('/division/uno/:numuno')
    @HttpCode(201)

    async  parametroDivide(
        @Param() divide,
        @Req() req,
        @Headers() headers
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
                    return {
                        mensaje: 'La División es igual a ' + dividir
                    };
                }
            } catch (e) {
                console.error('Error', e)
                throw  new BadRequestException('Error validando')
            }
            console.log('parametrosDivide', headers, n1, n2)

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
        res.send(
            {
                mensaje: 'CALCULADORA ANDRE :D...'
            }
        )
    }
    obtenerCookie(){

    }



}