import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res, Session
} from "@nestjs/common";
import {ReservaService} from "./reserva.service";
import {BoletosService} from "../Boletos/boletos.service";
import {AsientoService} from "../Asientos/asiento.service";
import {VueloService} from "../Vuelo/vuelo.service";
import {log} from "util";
import {UsuarioCreateDto} from "../usuario/dtoUsuario/usuario.create-dto";
import {UsuarioService} from "../usuario/usuario.service";
import {CabeceraReservaCreateDto} from "../CabeceraReserva/dtoCabeceraReserva/cabeceraReserva.create-dto";
import {CabeceraReservaService} from "../CabeceraReserva/cabeceraReserva.service";
import {ReservaCreateDto} from "./dtoReserva/reserva.create-dto";
import {BoletosEntity} from "../Boletos/boletos.entity";
import {VueloEntity} from "../Vuelo/vuelo.entity";
import {isDateString} from "class-validator";

@Controller('reserva')

export class ReservaController {

    constructor(
        private readonly _reservaService: ReservaService,
        private readonly _boletoService: BoletosService,
        private readonly _vueloService: VueloService,
        private readonly _asientoService: AsientoService,
        private readonly _usuarioService: UsuarioService,
        private readonly _cabeceraReservaService: CabeceraReservaService,
    ) {
    }

    @Get()
    async mostrarTodo(){
        try {
            const respuesta = await this._reservaService.buscarTodos();
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                    mensaje: 'Error del servidor en buscar'
                }
            )
        }
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        try {
            const respuesta = await  this._reservaService.crearUno(parametrosCuerpo);
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        try {
            const respuesta = await this._reservaService.buscarUno(Number(parametrosRuta.id));
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor al ver uno'
            })
        }
    }

    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const reservaEditado = parametrosCuerpo;

        try {
            const respuesta = await this._reservaService.editarUno(reservaEditado);
            return respuesta;
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor al editar uno'
            })
        }
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        try {
            const respuesta = await this._reservaService.eliminarUno(id);
            return respuesta;
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor al eliminar uno'
            })
        }
    }

    @Get('vista/reserva/:id/:numeroAsiento/:idVuelo')
    async reserva(
        @Res() res,
        @Body() parametrosCuerpo,
        @Query() parametrosConsulta,
        @Param() parametrosruta
    ){
        let resultadoEncontrado
        try {
            //resultadoEncontrado = await this._vueloService.buscarTodosParametros(parametrosConsulta.destino)
            resultadoEncontrado = await this._boletoService.buscarTodos()
            console.log("LLega hasta aquí el arreglo ", resultadoEncontrado)
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando destino')
        }
        if (resultadoEncontrado) {

            const numAsiento = Number(parametrosruta.numeroAsiento)
            const id_asiento = Number(parametrosruta.id)
            const id_vuelo = Number(parametrosruta.idVuelo)
            console.log("****************************", id_asiento)
            console.log("****************************", id_vuelo)

            return res.render(
                'viajes/reservar',
                {
                    arregloBoleto: resultadoEncontrado,
                    id: id_asiento,
                    idVuelo: id_vuelo,
                    numero_asiento_reservado: numAsiento
                    //parametrosConsulta: parametrosConsulta
                });
        } else {
            throw new NotFoundException('No se encontraron viajes')
        }

        //res.render('viajes/reservar')
    }

    /*@Get('reserva')
    async ofertasVista(
        @Res() res,
        @Query() parametrosConsulta
    )
    {
        let resultadoEncontrado
        try {
            //resultadoEncontrado = await this._vueloService.buscarTodosParametros(parametrosConsulta.destino)
            resultadoEncontrado = await this._vueloService.buscarTodos()
            console.log("LLega hasta aquí el arreglo ", resultadoEncontrado)
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando destino')
        }
        if (resultadoEncontrado) {
            res.render(
                'vuelo/viajes',
                {
                    arregloViaje: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                });
        } else {
            throw new NotFoundException('No se encontraron viajes')
        }
    }*/

    /*@Get('vista/datos/:id')
    async datos(
        @Res() res,
        @Param() parametrosruta
    ){
        //const fechaActual = Date.now()
        //console.log("Esta es la fecha******************", fechaActual)
        const id_asiento = Number(parametrosruta.id)
        let respuestaBusqueda = await this._asientoService.busqueda(id_asiento)
        try {

        }
        //const

    }*/

    @Get('vista/datos/:id_Boleto/:id_Vuelo/:id_Asiento')
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
        let respuesta4
        try {
            respuesta1 = await this._boletoService.buscarUno(id_boleto)
            respuesta2 = await this._vueloService.buscarUno(id_vuelo)
            respuesta3 = await this._asientoService.buscarUno(id_asiento)


            console.log("LLega hasta aquí el arreglo *************", respuesta1)
            console.log("LLega hasta aquí el arreglo *************", respuesta2)
            console.log("LLega hasta aquí el arreglo *************", respuesta3)


        } catch (error) {
            throw new InternalServerErrorException('Error encontrando destino')
        }
        if (respuesta1 && respuesta2 && respuesta3) {
            console.log("AQUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUIIIIIII")
            const boletoEditando = {
                id_Boleto:id_boleto,
                asiento:parametrosruta.id_Asiento
            } as BoletosEntity;
            respuesta4=await this._boletoService.editarUno(boletoEditando)
            const vueloEditando = {
                id_Vuelo:id_vuelo,
                asientos_diponibles:respuesta2.asientos_diponibles-respuesta3.numero_asiento_reservado,
                asientos_ocupados:respuesta2.asientos_ocupados+respuesta3.numero_asiento_reservado
            } as VueloEntity;
            const respuesta5=await this._vueloService.editarUno(vueloEditando)
            console.log("LLega hasta aquí el arreglo *************", respuesta4)
            console.log("LLega hasta aquí el arreglo *************", respuesta5)
            res.render(
                'pagos/datosPago',
                {
                    arregloVuelo: respuesta2,
                    arregloBoleto: respuesta1,
                    arregloAsiento: respuesta3,


                });
        } else {
            throw new NotFoundException('No se encontraron viajes')
        }
        //const

    }
    @Post('vista/reservarVuelo/:id_Boleto/:id_Vuelo/:id_Asiento')
    async reservarVuelo(
        @Body() paramentroscuerpo,
        @Res() res,
        @Session() sesions,
        @Param() parametroruta
    ) {
        const cabecera = paramentroscuerpo
        const estado = cabecera.estado_reserva
        const observaciones = cabecera.observaciones
        console.log("usuario",sesions.usuario)
        const obtenerusuario = await this._usuarioService.buscarnombre(sesions.usuario);
        console.log("usuario",obtenerusuario)
        const idUsuario=obtenerusuario.id_usuario

        const cabeceradto = new CabeceraReservaCreateDto()
        cabeceradto.estadoReserva=estado
        cabeceradto.observaciones=observaciones
        cabecera.usuario=idUsuario
        const reserva=paramentroscuerpo
        function convertDateFormat(string) {
            return string.split('/').reverse().join('-');
        }
        const fechaReserva= convertDateFormat(reserva.fecha_reserva)
        console.log(fechaReserva)


        const tipo=reserva.tipo
        const id_asiento=parametroruta.id_Asiento

        reserva.asiento=id_asiento
        const reservadto=new ReservaCreateDto()
        reservadto.fechaReserva=fechaReserva
        reservadto.tipo=tipo

        let cabeceraReserva;
        try {
            cabeceraReserva = await this._cabeceraReservaService.crearUno(cabecera);
        } catch (errores) {
            console.error("error de try ", errores)
            const mensajeError = 'ERROR EN VALIDACIÓN despues de try'
            return res.redirect('/vista/datos/'+parametroruta.id_Boleto+'/'+parametroruta.id_Vuelo+'/'+parametroruta.id_Asiento+'?error=' + mensajeError)
        }
        console.log('usuario creado', cabeceraReserva)
        if (cabeceraReserva) {
            const idcabecera = cabeceraReserva.id_cabecera_reserva
            console.log("ID USUARIO", idcabecera)
            reserva.cabeceraReserva = idcabecera
            let respuestareserva;
            try {
                respuestareserva = await this._reservaService.crearUno(reserva);
            } catch (error) {
                console.error(error);
                const mensajeError = 'Error al registrar el usuario'
                return res.redirect('/vista/datos/'+parametroruta.id_Boleto+'/'+parametroruta.id_Vuelo+'/'+parametroruta.id_Asiento+'?error=' + mensajeError)
            }
            console.log('rol usuario creado', respuestareserva)

            if (respuestareserva) {
                return res.redirect('/pagos/vista/pagar/'+parametroruta.id_Boleto+'/'+parametroruta.id_Vuelo+'/'+parametroruta.id_Asiento);

                if (respuestareserva) {
                    return res.redirect('/pagos/vista/pagar/'+parametroruta.id_Boleto);

                } else {
                    const mensajeError = 'Error al registrar el rol usuario'
                    return res.redirect('/vista/datos/'+parametroruta.id_Boleto+'/'+parametroruta.id_Vuelo+'/'+parametroruta.id_Asiento+'?error=' + mensajeError)
                }
            } else {
                const mensajeError = 'Error al registrar el usuario'
                return res.redirect('/vista/datos/'+parametroruta.id_Boleto+'/'+parametroruta.id_Vuelo+'/'+parametroruta.id_Asiento+'?error=' + mensajeError)
            }
        }

    }


}