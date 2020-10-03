import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Res
} from "@nestjs/common";

import {EscalasService} from "./escalas.service";
import {EscalasCreateDto} from "./dtoEscalas/escalas.create-dto";
import {validate, ValidationError} from "class-validator";
import {elementAt} from "rxjs/operators";


@Controller('escalas')
export class EscalasController {
    constructor(
        //inyeccion de dependencias
        private readonly  _escalaService: EscalasService,
    ) {

    }

    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._escalaService.buscarTodos()
            return respuesta
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje: "Error del servidor"
                }
            )
        }

    }

    @Post()
    async crearUno(
        @Body() parametroscuerpo
    ) {
        try {
            //validacion del CREATE DTO
            const respuesta = await this._escalaService.crearUno(parametroscuerpo)
            return respuesta

        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }

    @Get(':id')
    async verUno(
        @Param() paramentrosRuta
    ) {
        let respuesta
        try {
            const respuesta = await this._escalaService.buscarUno(paramentrosRuta.id)


        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje: "Error del servidor"
                }
            )
        }
        if (respuesta) {
            return respuesta
        } else {
            throw new NotFoundException(
                {
                    mensaje: 'No existen registros'
                }
            )
        }
    }

    @Put(':id')
    async editarUno(
        @Param() parametroRuta,
        @Body() paramentroCuerpo
    ) {
        const id = Number(parametroRuta.id);
        const escalaEditado = paramentroCuerpo
        escalaEditado.id = id;
        try {
            console.log('boleto editado', escalaEditado)
            const respuesta = await this._escalaService.editarUno(escalaEditado)
            return respuesta;

        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje: "Error del servidor"
                }
            )
        }
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametroRuta
    ) {
        const id = Number(parametroRuta.id)
        try {

            const respuesta = await this._escalaService.eliminarUno(id)
            return {
                mensaje: 'Registro con id' + id + 'eliminado'
            }

        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje: "Error del servidor"
                }
            )
        }
    }

    @Post('vista/aniadir/:id')
    async añadirEscalas(
        @Param() parametrosRuta,
        @Res() res,
        @Body() paramentroscuerpo
    ) {
        const lugar = paramentroscuerpo.lugar_escala
        const tiempo =Number( paramentroscuerpo.tiempo_escala)
        let vuelo = paramentroscuerpo.vuelo
        const escalDto = new EscalasCreateDto()
        escalDto.lugar_escala = lugar
        escalDto.tiempo_escala = tiempo
        const idVuelo = parametrosRuta.id
        paramentroscuerpo.vuelo=idVuelo
        try {
            const errores: ValidationError[] = await validate(escalDto)
            if (errores.length > 0) {

                console.error("error de try ", errores)
                const mensajeError = 'ERROR Validando datos'
                return res.redirect('/vuelo/vista/adminEscalas/' + idVuelo + '?error=' + mensajeError)

            } else {
                //vuelo=idVuelo
                let respuestaRegistro
                try {
                    respuestaRegistro = await this._escalaService.crearUno(paramentroscuerpo)
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'Error al registrar una escala'
                    return res.redirect('/vuelo/vista/adminEscalas/' + idVuelo + '?error=' + mensajeError)
                }
                if (respuestaRegistro) {
                    return res.redirect('/vuelo/vista/admin');
                } else {
                    const mensajeError = 'Error al registrar el viaje'
                    return res.redirect('/vuelo/vista/adminEscalas/' + idVuelo + '?error=' + mensajeError)
                }


            }

        } catch (e) {
            console.error('Error', e)
            const mensajeError = 'ERROR EN VALIDACIÓN'
            return res.redirect('/vuelo/vista/adminEscalas/' + idVuelo + '?error=' + mensajeError)


        }
    }

}