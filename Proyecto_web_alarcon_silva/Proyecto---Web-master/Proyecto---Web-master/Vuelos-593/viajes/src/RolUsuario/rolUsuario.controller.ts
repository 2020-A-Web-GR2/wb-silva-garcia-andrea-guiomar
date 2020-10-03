import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put, Req, Res, Session
} from "@nestjs/common";
import {RolUsuarioService} from "./rolUsuario.service";
import {UsuarioCreateDto} from "../usuario/dtoUsuario/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {EscalasCreateDto} from "../Escalas/dtoEscalas/escalas.create-dto";
import {UsuarioService} from "../usuario/usuario.service";
import {RolUsuarioCreateDto} from "./dtoRolUsuario/rolUsuario.create-dto";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {RolUsuarioEntity} from "./rolUsuario.entity";

@Controller('rolUsuario')

export class RolUsuarioController {

    constructor(
        private readonly _rolUsuarioService: RolUsuarioService,
        private readonly _usuarioService: UsuarioService
    ) {
    }

    @Get()
    async mostrarTodo() {
        try {
            const respuesta = await this._rolUsuarioService.buscarTodos();
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
    ) {
        try {
            const respuesta = await this._rolUsuarioService.crearUno(parametrosCuerpo);
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
    ) {
        try {
            const respuesta = await this._rolUsuarioService.buscarUno(Number(parametrosRuta.id));
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
    ) {
        const id = Number(parametrosRuta.id);
        const reservaEditado = parametrosCuerpo;

        try {
            const respuesta = await this._rolUsuarioService.editarUno(reservaEditado);
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor al editar uno'
            })
        }
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ) {
        const id = Number(parametrosRuta.id);
        try {
            const respuesta = await this._rolUsuarioService.eliminarUno(id);
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor al eliminar uno'
            })
        }
    }

    @Post('registrarVista')
    async registrarVista(
        @Body() paramentroscuerpo,
        @Res() res
    ) {

        /*  const nombre = paramentroscuerpo.nombre_usuario
          const apellido = paramentroscuerpo.apellido_usuario
          const correo = paramentroscuerpo.correo_usuario
          const edad = paramentroscuerpo.edad_usuario
          const contrasenia = paramentroscuerpo.contrasenia
          const usuario = new UsuarioCreateDto()

          usuario.nombreUsuario = nombre
          usuario.apellidoUsuario = apellido
          usuario.correoUsuario = correo
          usuario.edad = Number(edad)
          usuario.contrasenia = contrasenia

         */
        const usuariorol = paramentroscuerpo
        const nombre = usuariorol.nombre_usuario
        const apellido = usuariorol.apellido_usuario
        const correo = usuariorol.correo_usuario
        const edad = usuariorol.edad_usuario
        const contrasenia = usuariorol.contrasenia
        const usuario = new UsuarioCreateDto()

        usuario.nombreUsuario = nombre
        usuario.apellidoUsuario = apellido
        usuario.correoUsuario = correo
        usuario.edad = Number(edad)
        usuario.contrasenia = contrasenia
        const rolUusrio = paramentroscuerpo


        const detalle = "nuevoCliente"
        const rolUusriodto = new RolUsuarioCreateDto()
        rolUusriodto.detalle = detalle
        rolUusrio.detalle = detalle

        const idrol = 1
        rolUusrio.rol = idrol


        console.log("impimeidno datos", nombre)
        console.log("impimeidno datos", apellido)
        console.log("impimeidno datos", correo)

        /* try {
             const errores: ValidationError[] = await validate(usuario)
             if (errores.length > 0) {

                 console.error("error de try ",errores)
                 const mensajeError = 'ERROR EN VALIDACIÓN despues de try'
                 return res.redirect('/usuario/vista/registrar?error=' + mensajeError)

             } else {
                 let respuestaRegistro
                 try{
                     respuestaRegistro=await this._usuarioService.crearUno(paramentroscuerpo)
                 }catch (error) {
                     console.error(error);
                     const mensajeError = 'Error al registrar el usuario'
                     return res.redirect('/usuario/vista/registrar?error=' + mensajeError)
                 }
                 if(respuestaRegistro){
                     return res.redirect('/vuelo/vista/viajes');
                 }else{
                     const mensajeError = 'Error al registrar el usuario'
                     return res.redirect('/usuario/vista/registrar?error=' + mensajeError)
                 }

             }

         } catch (e) {
             console.error('Error', e)
             const mensajeError = 'ERROR EN VALIDACIÓN en catch'
             return res.redirect('/usuario/vista/registrar?error=' + mensajeError)
         }

         */
        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuariorol);
        } catch (errores) {
            console.error("error de try ", errores)
            const mensajeError = 'Error validando datos'
            return res.redirect('/usuario/vista/registrar?error=' + mensajeError)
        }
        console.log('usuario creado', usuarioCreado)
        if (usuarioCreado) {
            const idusuario = usuarioCreado.id_usuario
            console.log("ID USUARIO", idusuario)
            rolUusrio.usuario = idusuario
            let rolusuarioCreada;
            try {
                rolusuarioCreada = await this._rolUsuarioService.crearUno(rolUusrio);
            } catch (error) {
                console.error(error);
                const mensajeError = 'Error al registrar el usuario'
                return res.redirect('/usuario/vista/registrar?error=' + mensajeError)
            }
            console.log('rol usuario creado', rolusuarioCreada)

            if (rolusuarioCreada) {
                return res.redirect('/usuario/vista/inicio');

                if (rolusuarioCreada) {
                    return res.redirect('/usuario/vista/inicio');

                    // rolUsuario: rolusuarioCreada,
                    //usuario: usuarioCreado

                } else {
                    const mensajeError = 'Error al registrar el rol usuario'
                    return res.redirect('/usuario/vista/registrar?error=' + mensajeError)
                }
            } else {
                const mensajeError = 'Error al registrar el usuario'
                return res.redirect('/usuario/vista/registrar?error=' + mensajeError)
            }
        }
    }

    @Post('loginVista')
    async loginVista(
            @Body() paramentroscuerpo,
            @Res() res,
            @Session() session,
            @Param() parametrosRuta
    )
        {
            const correo = paramentroscuerpo.correo_usuario
            const contrasenia =
                paramentroscuerpo.contrasenia
            //const usuario = new UsuarioCreateDto()
            //usuario.correoUsuario = correo
            console.log("datos busqueda", correo, contrasenia)

            let respuetabusqueda
            let compararrespuesta

            try {
                // compararrespuesta=await this._usuarioService.buscarLogincontrasenia(contrasenia,correo)
                respuetabusqueda = await this._usuarioService.login(correo, contrasenia)
                console.log("usuario log", respuetabusqueda)

            } catch (error) {
                console.error(error);
                const mensajeError = 'Usuario o contraseña incorrectos'
                return res.redirect('/usuario/vista/iniciar?error=' + mensajeError)
            }
            if (respuetabusqueda) {
                const buscaAdmin = respuetabusqueda.rolUsuarios

                console.log("rol", buscaAdmin)
                if (buscaAdmin.some(rolUsuario =>
                    rolUsuario.rol.tipo_rol == 'administrador')) {
                    console.log("rol", buscaAdmin)
                    session.usuario = respuetabusqueda.nombre_usuario
                    //session.rol=buscaAdmin.rol.tipo_rol
                    console.log("sesiones", session.usuario )
                    //console.log("sesiones", session.rol)

                    return res.redirect('/vuelo/vista/admin');
                } else {
                    //  const mensajeError = 'Usuario no tiene sufienetes permisos'
                    // return res.redirect('/usuario/vista/iniciar?error=' + mensajeError)
                    if (buscaAdmin.some(rolUsuario =>
                        rolUsuario.rol.tipo_rol == 'cliente')) {
                        console.log("rol", buscaAdmin)
                        session.usuario = respuetabusqueda.nombre_usuario
                        return res.redirect('/vuelo/vista/viajes');
                    } else {
                        const mensajeError = 'Usuario no exite'
                        return res.redirect('/usuario/vista/iniciar?error=' + mensajeError)
                    }

                }
            } else {
                const mensajeError = 'Usuario o contraseña incorrectos'
                return res.redirect('/usuario/vista/iniciar?error=' + mensajeError)
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
        return res.redirect('/usuario/vista/iniciar')
    }

}
