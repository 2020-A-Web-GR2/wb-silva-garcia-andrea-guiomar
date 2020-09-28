import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put, Query, Req, Res, Session
} from "@nestjs/common";
import {CartaService} from "./carta.service";
import {CartaCreateDto} from "./dto/carta.create";
import {validate, ValidationError} from "class-validator";
import {CartaEntity} from "./carta.entity";

@Controller('carta')
export class CartaController {
    constructor(
        //inyeccion de dependencias
        private readonly  _cartaService: CartaService,
    ) {

    }

    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._cartaService.buscarTodos()
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
            const respuesta = await this._cartaService.crearUno(parametroscuerpo)
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
            const respuesta = await this._cartaService.buscarUno(paramentrosRuta.id)


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
        const cartaEditada = paramentroCuerpo
        cartaEditada.id = id;
        try {
            console.log('usuario editado', cartaEditada)
            const respuesta = await this._cartaService.editarUno(cartaEditada)
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

            const respuesta = await this._cartaService.eliminarUno(id)
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

    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Query() parametrosconsulta,
        @Session() session
    ) {

        const estaLogeado = session.usuario;
        if (estaLogeado) {
            let resultadoEncontrado
            try {
                resultadoEncontrado = await this._cartaService.buscarTodos();
            } catch (error) {
                throw new InternalServerErrorException('Error encontrando cartas')
            }
            if (resultadoEncontrado) {
                res.render(
                    'carta_vista/inicio',
                    {
                        usuario: session.usuario
                        ,arregloCartas: resultadoEncontrado,
                        parametrosConsulta: parametrosconsulta
                    });
            } else {
                throw new NotFoundException('No se encontraron cartas')
            }

        } else {
            return res.redirect('/carta/login')
        }




    }

    @Get('vista/crear')
    crear(
        @Res() res,
        @Query() parametrosConsulta
    ) {
        return res.render(
            'carta_vista/crear', {
                error: parametrosConsulta.error,
                nombreMonstruo: parametrosConsulta.nombre_mostruo,
                tipoMonstruo: parametrosConsulta.tipo_monstruo,
                efecto: parametrosConsulta.efecto,
                atributo: parametrosConsulta.atributo,
                rango: parametrosConsulta.rango,
                ataqueDefensa: parametrosConsulta.ataque_defencsa
            }
        )

    }

    @Get('vista/editar/:id') // Controlador
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let cartaEncontrada;
        try {
            cartaEncontrada = await this._cartaService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/carta/vista/inicio?mensaje=Error buscando carta');
        }
        if (cartaEncontrada) {
            return res.render(
                'carta_vista/crear',
                {
                    error: parametrosConsulta.error,
                    carta: cartaEncontrada
                }
            )
        } else {
            return res.redirect('/carta/vista/inicio?mensaje=Usuario no encontrado');
        }

    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        // Validar los datos con un DTO
        const nombreMonstruo = parametrosCuerpo.nombre_mostruo;
        const tipoMonstruo = parametrosCuerpo.tipo_monstruo;
        const efecto = parametrosCuerpo.efecto;
        const atributo = parametrosCuerpo.atributo;
        const rango = parametrosCuerpo.rango;
        const ataqueDefensa = parametrosCuerpo.ataque_defencsa;
        const carta = new CartaCreateDto()
        carta.nombreMostruo = nombreMonstruo
        carta.tipoMonstruo = tipoMonstruo
        carta.efecto = efecto
        carta.atributo = atributo
        carta.rango = Number(rango)
        carta.ataqueDefensa = ataqueDefensa
        try {
            const errores: ValidationError[] = await validate(carta)
            if (errores.length > 0) {

                console.error("error de try ", errores)
                const mensajeError = 'ERROR EN VALIDACIÓN despues de try'
                return res.redirect('/vuelo/vista/adminViajes?error=' + mensajeError)

            } else {
                let respuestaCreacionUsuario;
                try {
                    respuestaCreacionUsuario = await this._cartaService.crearUno(parametrosCuerpo);
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'Error creando usuario'
                    return res.redirect('/carta/vista/crear?error=' + mensajeError)
                }
                if (respuestaCreacionUsuario) {
                    return res.redirect('/carta/vista/inicio');
                } else {
                    const mensajeError = 'Error creando usuario'
                    return res.redirect('/usuario/vista/crear?error=' + mensajeError);
                }
            }
        } catch (e) {
            console.error('Error', e)
            const mensajeError = 'ERROR EN VALIDACIÓN en catch'
            return res.redirect('carta/vista/carar?error=' + mensajeError)
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const cartaEditado = {
            id: Number(parametrosRuta.id),
            efecto: parametrosCuerpo.efecto,
            rango: parametrosCuerpo.rango,
            ataque_defencsa: parametrosCuerpo.ataque_defencsa,
        } as CartaEntity;
        try {
            await this._cartaService.editarUno(cartaEditado);
            return res.redirect('/carta/vista/inicio?mensaje=Carta editada');
        } catch (error) {
            console.error(error);
            return res.redirect('/carta/vista/inicio?mensaje=Error editando carta');
        }

    }


    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._cartaService.eliminarUno(id);
            return res.redirect('/carta/vista/inicio?mensaje=Carta eliminada');
        } catch (error) {
            console.log(error);
            return res.redirect('/carta/vista/inicio?error=Error eliminando carta');
        }
    }

    @Get('/vista/login')
    login(
        @Res() response
    ) {
        return response.render('login/login')
    }

    @Post('login')
    loginPost(
        @Body() parametrosConsulta,
        @Res() response,
        @Session() session
    ) {
        //validamos datos

        const usuario = parametrosConsulta.usuario
        const password = parametrosConsulta.password
        if (usuario == 'Adrian' && password == '1234') {
            session.usuario = usuario
             return response.redirect('/carta/vista/inicio')
        } else {
           return response.redirect('/carta/vista/login?error=Permiso denegado')
        }
    }
    @Get('/vista/logout')
    logout(
        @Session() session,
        @Res() res,
        @Req() req
    ){
        session.username=undefined
        req.session.destroy();
        return res.redirect('/carta/vista/login')
    }
}