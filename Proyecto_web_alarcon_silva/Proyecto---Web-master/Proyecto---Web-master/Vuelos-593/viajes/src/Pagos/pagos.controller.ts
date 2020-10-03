import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Res, Session
} from "@nestjs/common";

import {PagosService} from "./pagos.service";
import {ReservaService} from "../Reserva/reserva.service";
import {BoletosService} from "../Boletos/boletos.service";
import {VueloService} from "../Vuelo/vuelo.service";
import {AsientoService} from "../Asientos/asiento.service";
import {UsuarioService} from "../usuario/usuario.service";
import {Double} from "typeorm";
import {PagosCreateDto} from "./dtoPagos/pagos.create-dto";
import {DateUtils} from "typeorm/util/DateUtils";


@Controller('pagos')
export class PagosController {
    constructor(
        //inyeccion de dependencias

        private readonly _boletoService: BoletosService,
        private readonly _vueloService: VueloService,
        private readonly _asientoService: AsientoService,
        private readonly _usuarioService: UsuarioService,
        private readonly  _pagoService:PagosService,
    ) {

    }

    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._pagoService.buscarTodos()
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
            const respuesta = await this._pagoService.crearUno(parametroscuerpo)
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
            const respuesta = await this._pagoService.buscarUno(paramentrosRuta.id)


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
        const pagoEditado = paramentroCuerpo
        pagoEditado.id = id;
        try {
            console.log('pago editado', pagoEditado)
            const respuesta = await this._pagoService.editarUno(pagoEditado)
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

            const respuesta = await this._pagoService.eliminarUno(id)
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
@Get('/vista/pagar/:idBoleto/:idVuelo/:idAsiento')
async pagar(
    @Res() res,
    @Param() parametrosruta,
    @Session() sesion
) {
    //const fechaActual = Date.now()
    //console.log("Esta es la fecha******************", fechaActual)
    const id_boleto = Number(parametrosruta.idBoleto)
    console.log("************************************", id_boleto)
    const id_vuelo = Number(parametrosruta.idVuelo)
    console.log("************************************", id_vuelo)
    const id_asiento = Number(parametrosruta.idAsiento)
    console.log("************************************", id_asiento)
    let respuesta1
    let respuesta2
    let respuesta3
    let respuestausuario
    try {
        respuesta1 = await this._boletoService.buscarUno(id_boleto)
        respuesta2 = await this._vueloService.buscarUno(id_vuelo)
        respuesta3 = await this._asientoService.buscarUno(id_asiento)
        respuestausuario=await this._usuarioService.buscarnombre(sesion.usuario)

        console.log("LLega hasta aquí el arreglo *************", respuesta1)
        console.log("LLega hasta aquí el arreglo *************", respuesta2)
        console.log("LLega hasta aquí el arreglo *************", respuesta3)

    } catch (error) {
        throw new InternalServerErrorException('Error encontrando destino')
    }
    if (respuesta1 && respuesta2 && respuesta3) {
        console.log("AQUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUIIIIIII")
        res.render(
            'pagos/pagar_boleto',
            {
                arregloVuelo: respuesta2,
                arregloBoleto: respuesta1,
                arregloAsiento: respuesta3,
                usuario:respuestausuario,
                ruta:parametrosruta


            });
    } else {
        throw new NotFoundException('No se encontraron viajes')
    }
}

@Post('pagarVista/:idBoleto/:monto/:idVuelo/:idAsiento')
async tarjeta(
    @Body() paramentroscuerpo,
    @Res() res,
    @Param() parametroruta
) {
    const id_boleto = Number(parametroruta.idBoleto)
    console.log("************************************", id_boleto)
    const pago = paramentroscuerpo
    const tipoPago = pago.tipo_pago
    console.log("************************************", tipoPago)
    const monto = Number(parametroruta.monto)
    console.log("************************************", monto)
    const numTarjeta = pago.numero_tarjeta
    const digito = pago.digito_seguridad
    function convertDateFormat(string) {
        return string.split('/').reverse().join('-');
    }
    const caducidad = convertDateFormat(pago.fecha_caducidad)
    console.log("************************************",caducidad)
    pago.boleto = id_boleto
    pago.monto_total=monto
    const pagodto = new PagosCreateDto()
    pagodto.tipo_pago = tipoPago
   // pagodto.monto_total = monto
    pagodto.numero_tarjeta = numTarjeta
    pagodto.digito_seguridad = digito
    //pagodto.fecha_caducidad = caducidad
    let respuestapagos;
    try {
        respuestapagos = await this._pagoService.crearUno(pago);
    } catch (errores) {
        console.error("error de try ", errores)
        const mensajeError = 'ERROR EN VALIDACIÓN despues de try'
        return res.redirect('/vista/pagar/' + parametroruta.id_Boleto + '/' + parametroruta.id_Vuelo + '/' + parametroruta.id_Asiento + '?error=' + mensajeError)
    }
    if (respuestapagos) {
        return res.redirect('/usuario/vista/inicio/');

    } else {
        const mensajeError = 'Error al registrar el rol usuario'
        return res.redirect('/vista/pagar/' + parametroruta.id_Boleto + '/' + parametroruta.id_Vuelo + '/' + parametroruta.id_Asiento + '?error=' + mensajeError)
    }
}


}