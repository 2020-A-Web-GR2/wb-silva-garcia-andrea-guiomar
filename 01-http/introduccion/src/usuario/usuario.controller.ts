import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

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
    public idActual=3;
    @Get()
    mostrarTodos(){
        return this.arregloUusarios
    }

    @Post()
    crearUno(
        @Body() parametroscuerpo
    ){
        const nuevoUsuario={
            id:this.idActual+1,
            nombre: parametroscuerpo.nombre
        }
        this.arregloUusarios.push(
            nuevoUsuario
        )
        this.idActual= this.idActual + 1
        return nuevoUsuario
    }

    @Get(':id')
    verUno(
        @Param() paramentrosRuta
    ){
       const  indice= this.arregloUusarios.findIndex(
           (usuario)=> usuario.id ===
               Number(paramentrosRuta.id)

       )
        return this.arregloUusarios[indice]
    }


    @Put(':id')
    editarUno(
        @Param() parametroRuta,
        @Body() paramentroCuerpo
    ){
        const  indice= this.arregloUusarios.findIndex(
            (usuario)=> usuario.id ===
                Number(parametroRuta.id)

        );
        this.arregloUusarios[indice].nombre=paramentroCuerpo.nombre;
        return this.arregloUusarios[indice]

    }

    @Delete(':id')
    eliminarUno(
        @Param() parametroRuta

    ){
        const  indice= this.arregloUusarios.findIndex(
            (usuario)=> usuario.id ===
                Number(parametroRuta.id)

        )
        this.arregloUusarios.splice(indice,1);
        return this.arregloUusarios[indice]

    }
}