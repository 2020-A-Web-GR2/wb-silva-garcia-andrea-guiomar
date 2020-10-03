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
import {AsientoService} from "./asiento.service";
import {AsientoCreateDto} from "./dtoAsientos/asiento.create-dto";
import {validate, ValidationError} from "class-validator";

@Controller('asiento')
export class AsientoController {
    constructor(
        //inyeccion de dependencias
        private readonly  _asientoService: AsientoService
    ) {

    }

    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._asientoService.buscarTodos()
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
            const respuesta = await this._asientoService.crearUno(parametroscuerpo)
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
            const respuesta = await this._asientoService.buscarUno(paramentrosRuta.id)


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
        const asientoEditado = paramentroCuerpo
        asientoEditado.id = id;
        try {
            console.log('asiento editado', asientoEditado)
            const respuesta = await this._asientoService.editarUno(asientoEditado)
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

            const respuesta = await this._asientoService.eliminarUno(id)
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

    @Post('vista/reservarAsientos/:id')
    async reservarAsientos(
        @Body() parametrosCuerpo,
        @Res() res,
        @Param() parametrosRuta
    ) {
        const numAsientos = Number(parametrosCuerpo.numero_asiento_reservado)
        const tipo = parametrosCuerpo.tipo_asiento_reservado
        const validarDTO = new AsientoCreateDto()
        validarDTO.numero_asiento = numAsientos
        validarDTO.tipo_asiento = tipo
        const id_vuelo = parametrosRuta.id
        parametrosCuerpo.vuelo = id_vuelo

        try {
            const errores: ValidationError[] = await validate(validarDTO)
            if (errores.length > 0) {

                console.error("error de try ", errores)
                const mensajeError = 'Error validando datos'
                return res.redirect('/vuelo/vista/datosViaje/' + id_vuelo + '?error=' + mensajeError)

            } else {
                //vuelo=idVuelo
                let respuestaAsiento
                try {
                    respuestaAsiento = await this._asientoService.crearUno(parametrosCuerpo)
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'Error al registrar el vuelo'
                    return res.redirect('/vuelo/vista/datosViaje/' + id_vuelo + '?error=' + mensajeError)
                }
                if (respuestaAsiento) {
                    return res.redirect('/reserva/vista/reserva/' + respuestaAsiento.id_Asiento + '/' + respuestaAsiento.numero_asiento_reservado + '/' + id_vuelo);
                } else {
                    const mensajeError = 'Error al registrar el viaje'
                    return res.redirect('/vuelo/vista/datosViaje/' + id_vuelo + '?error=' + mensajeError)
                }


            }

        } catch (e) {
            console.error('Error', e)
            const mensajeError = 'ERROR EN VALIDACIÓN en catch'
            return res.redirect('/vuelo/vista/reservarAsientos/' + id_vuelo + '?error=' + mensajeError)

        }
    }


}