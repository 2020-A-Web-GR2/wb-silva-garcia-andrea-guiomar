import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";
import e from "express";
import {UsuarioEntity} from "./usuario.entity";

@Controller('usuario')
export class UsuarioController {
public arregloUusarios=[
    {
       id: 1,
       nombre:'Andrea'
    },
    {
        id:2,
        nombre:'Nicole'
    },
    {
        id:3,
        nombre:'Guiomar'
    }
]
    //public idActual=4;
constructor(
    //inyeccion de dependencias
    private readonly  _usuarioService: UsuarioService,
    private readonly  _mascotaService: MascotaService
){

}
   // @Get()
  //  mostrarTodos(){
    //    return this.arregloUusarios
  //  }
    @Get()
    async mostrarTodos(){
    try{
        const  respuesta= await   this._usuarioService.buscarTodos()
        return respuesta
    }catch (e) {
        console.error(e)
        throw new InternalServerErrorException(
            {
                mensaje:"Error del servidor"
            }
        )
    }

    }

    @Post()
    async crearUno(
        @Body() parametroscuerpo
    ){
        try{
            //validacion del CREATE DTO
            const respuesta = await this._usuarioService.crearUno(parametroscuerpo)
            return  respuesta

        }catch (e) {
            console.error(e);
            throw new  BadRequestException({
                mensaje:'Error validando datos'
            })
        }
        //const nuevoUsuario={
         //   id:this.idActual+1,
          //  nombre: parametroscuerpo.nombre
        //}
        //this.arregloUusarios.push(
         //   nuevoUsuario
        //)
        //this.idActual= this.idActual + 1
       // return nuevoUsuario

    }

    @Get(':id')
    async verUno(
        @Param() paramentrosRuta
    ){
        let respuesta
        try{
            const  respuesta= await   this._usuarioService.buscarUno(paramentrosRuta.id)


        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje:"Error del servidor"
                }
            )
        }
        if(respuesta){
            return respuesta
        }else {
            throw new NotFoundException(
                {
                    mensaje:'No existen registros'
                }
            )
        }
    //const  indice= this.arregloUusarios.findIndex(
        //   (usuario)=> usuario.id ===
         //      Number(paramentrosRuta.id)

       //)
       // return this.arregloUusarios[indice]
    }


    @Put(':id')
    async editarUno(
        @Param() parametroRuta,
        @Body() paramentroCuerpo
    ){
        const id=Number(parametroRuta.id);
        const usuarioEditado=paramentroCuerpo
        usuarioEditado.id=id;
        try{
           console.log('usuario editado',usuarioEditado)
            const  respuesta= await   this._usuarioService.editarUno(usuarioEditado)
            return respuesta;

        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje:"Error del servidor"
                }
            )
        }

    // const  indice= this.arregloUusarios.findIndex(
        //    (usuario)=> usuario.id ===
         //       Number(parametroRuta.id)

        //);
        //this.arregloUusarios[indice].nombre=paramentroCuerpo.nombre;
        //return this.arregloUusarios[indice]

    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametroRuta

    ){
        const  id= Number(parametroRuta.id)
        try{

            const  respuesta= await   this._usuarioService.eliminarUno(id)
            return {
                mensaje: 'Registro con id'+id+'eliminado'
            }

        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje:"Error del servidor"
                }
            )
        }
    //  const  indice= this.arregloUusarios.findIndex(
      //      (usuario)=> usuario.id ===
      //          Number(parametroRuta.id)

      //  )
      //  this.arregloUusarios.splice(indice,1);
      //  return this.arregloUusarios[indice]

    }
    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ) {
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota
        // Validar Usuario
        // Valodar Mascota
        // -> CREAMOS LOS DOS
        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error creando usuario',
            })
        }
        console.log('usuario creado',usuarioCreado)
        if (usuarioCreado) {
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);
            } catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
            console.log('mascota creada',mascotaCreada)
            if (mascotaCreada) {
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: 'Error creando mascota',
            })
        }
    }
    //instalar el modulo ejs
    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
    const nombreControlador='Andrea';
    res.render(
        'usuario/ejemplo',//nombre de la vista (archivo)
        {
            //parametros de la vista
            nombre: nombreControlador,
        }
    )
    }


    @Get('vista/faq')
    faq(
        @Res() res
    ) {
        res.render('usuario/faq')
    }

    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Query()paramtrosconsulta
    ) {
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(paramtrosconsulta.busqueda);
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if (resultadoEncontrado) {
            res.render(
                'usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta:paramtrosconsulta
                });
        } else {
            throw new NotFoundException('No se encontraron usuarios')
        }


    }

    @Get('vista/login')
    login(
        @Res() res
    ) {
        res.render('usuario/login')
    }

    @Get('vista/crear')
    crearUusuarioVista(
        @Query() parametrosConsulta,
        @Res() res

    ) {
        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
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
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario');
        }
        if (usuarioEncontrado) {
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado
                }
            )
        } else {
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado');
        }

    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        // Validar los datos con un DTO
        let nombreApellidoConsulta;
        let cedulaConsulta;
        if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
            if (parametrosCuerpo.cedula.length === 10) {
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
            } else {
                const mensajeError = 'Cedula incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
            }
        } else {
            const mensajeError = 'Enviar cedula(10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }
        let respuestaCreacionUsuario;
        try {
            respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo);
        } catch (error) {
            console.error(error);
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }
        if (respuestaCreacionUsuario) {
            return res.redirect('/usuario/vista/inicio');
        } else {
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            // cedula: parametrosCuerpo.cedula,
        } as UsuarioEntity;
        try {
            await this._usuarioService.editarUno(usuarioEditado);
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado');
        }catch (error) {
            console.error(error);
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario');
        }

    }


    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id);
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado');
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario');
        }
    }

}