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

import {BoletosService} from "./boletos.service";
import {EscalasCreateDto} from "../Escalas/dtoEscalas/escalas.create-dto";
import {validate, ValidationError} from "class-validator";
import {BoletosCreateDto} from "./dtoBoletos/boletos.create-dto";
import {VueloService} from "../Vuelo/vuelo.service";
import {AsientoService} from "../Asientos/asiento.service";


@Controller('boleto')
export class BoletosController {
    constructor(
        //inyeccion de dependencias
        private readonly  _boletoService: BoletosService,
        private readonly  _vueloService: VueloService,
        private readonly  _asientoService: AsientoService
    ) {

    }
    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._boletoService.buscarTodos()
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
            const respuesta = await this._boletoService.crearUno(parametroscuerpo)
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
            const respuesta = await this._boletoService.buscarUno(paramentrosRuta.id)


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
        const boletoEditado = paramentroCuerpo
        boletoEditado.id = id;
        try {
            console.log('boleto editado', boletoEditado)
            const respuesta = await this._boletoService.editarUno(boletoEditado)
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

            const respuesta = await this._boletoService.eliminarUno(id)
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
    @Post('vista/aniadir_boleto')
    async añadirBoletos(
        @Param() parametrosRuta,
        @Res() res,
        @Body() paramentroscuerpo
    ) {

        const boleto=paramentroscuerpo;
        console.log("estooooooooooooooo", boleto)
        function convertDateFormat(string) {
            return string.split('/').reverse().join('-');
        }

        const fecha_salida = convertDateFormat(boleto.fecha_salida)

        const costo = paramentroscuerpo.costo_boleto
        const puerta=paramentroscuerpo.puerta_abordaje

        const BoletolDto = new BoletosCreateDto()
        BoletolDto.costo_boleto = costo
        BoletolDto.fecha_salida = fecha_salida
        BoletolDto.puerta_abordaje=puerta
        const idVuelo = parametrosRuta.id
        try {
            const errores: ValidationError[] = await validate(BoletolDto)
            if (errores.length > 0) {

                console.error("error de try ", errores)
                const mensajeError = 'Error validando datos'
                return res.redirect('/vuelo/vista/adminBoleto/?error=' + mensajeError)

            } else {

                let respuestaRegistro
                try {
                    respuestaRegistro = await this._boletoService.crearUno(paramentroscuerpo)
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'Error al registrar el vuelo'
                    return res.redirect('/vuelo/vista/adminBoleto/?error=' + mensajeError)
                }
                if (respuestaRegistro) {
                    return res.redirect('/vuelo/vista/admin');
                } else {
                    const mensajeError = 'Error al registrar el viaje'
                    return res.redirect('/vuelo/vista/adminBoleto/?error=' + mensajeError)
                }


            }

        } catch (e) {
            console.error('Error', e)
            const mensajeError = 'ERROR EN VALIDACIÓN '
            return res.redirect('/vuelo/vista/adminBoleto/?error=' + mensajeError)


        }
    }

    /*@Get('vista/datos/:id_Boleto/:id_Vuelo/:id_Asiento')
    async datos(
        @Res() res,
        @Param() parametrosruta
    ){
        //const fechaActual = Date.now()
        //console.log("Esta es la fecha******************", fechaActual)
        const id_boleto = Number(parametrosruta.id_Boleto)
        console.log("************************************", id_boleto)
        const id_vuelo = Number(parametrosruta.id_Vuelo)
        console.log("************************************", id_vuelo)
        const id_asiento = Number(parametrosruta.id_Asiento)
        console.log("************************************", id_asiento)
        let respuesta1
        let respuesta2
        let respuesta3
        try {
            respuesta1 = await this._boletoService.buscarUno(id_boleto)
            respuesta2 = await this._vueloService.buscarUno(id_vuelo)
            respuesta3 = await this._asientoService.buscarUno(id_asiento)

            console.log("LLega hasta aquí el arreglo ", respuesta1)

        } catch (error) {
            throw new InternalServerErrorException('Error encontrando destino')
        }
        if (respuesta1 && respuesta2 && respuesta3) {
            res.render(
                'viajes/datosPago',
                {
                    arregloBoleto: respuesta1,
                    arregloVuelo: respuesta2,
                    arregloAsiento: respuesta3,
                    parametrosRuta: parametrosruta

                });
        } else {
            throw new NotFoundException('No se encontraron viajes')
        }
        //const

    }*/
}