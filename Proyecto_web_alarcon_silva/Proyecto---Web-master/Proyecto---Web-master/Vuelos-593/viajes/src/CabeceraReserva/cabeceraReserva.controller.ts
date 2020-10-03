import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put, Res
} from "@nestjs/common";
import {CabeceraReservaService} from "./cabeceraReserva.service";
import {UsuarioService} from "../usuario/usuario.service";
import {VueloService} from "../Vuelo/vuelo.service";

@Controller('cabeceraReserva')

export class CabeceraReservaController {

    constructor(
        private readonly _cabeceraService: CabeceraReservaService,
    private readonly _usuarioService: UsuarioService,
        private readonly _vueloService: VueloService,
    ) {
    }

    @Get()
    async mostrarTodo(){
        try {
            const respuesta = await this._cabeceraService.buscarTodos();
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
            const respuesta = await  this._cabeceraService.crearUno(parametrosCuerpo);
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
            const respuesta = await this._cabeceraService.buscarUno(Number(parametrosRuta.id));
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
            const respuesta = await this._cabeceraService.editarUno(reservaEditado);
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
            const respuesta = await this._cabeceraService.eliminarUno(id);
            return respuesta;
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor al eliminar uno'
            })
        }
    }
    @Get('vista/reservaAdmin')
    async reservaAdmin(
        @Res()res
    ) {
        let resultadoEncontrado
        let resultadoUsuario
        let resultadovuelo
        try {
            resultadoEncontrado = await this._cabeceraService.buscarTodosRelacio();
            console.log("cabcera",resultadoEncontrado)
            resultadoUsuario=await  this._usuarioService.buscarusuariocabecera();
            console.log("uuario",resultadoUsuario)

            resultadovuelo=await this._vueloService.buscarvueloasientos()
            console.log("uuario",resultadovuelo)

        } catch (error) {
            throw new InternalServerErrorException('Error encontrando vuelos')
        }
        if (resultadoEncontrado) {

            res.render('administrar/adminReservas',
                {
                    arreglocabecera: resultadoEncontrado,
                    arreglovuelo:resultadovuelo,
                    arreglousuario:resultadoUsuario


                })
        }
    }

}