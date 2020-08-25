import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";
import e from "express";

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
        'ejemplo',//nombre de la vista (archivo)
        {
            //parametros de la vista
            nombre: nombreControlador,
        }
    )
    }

}