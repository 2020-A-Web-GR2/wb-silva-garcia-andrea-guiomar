import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Equal, FindManyOptions, Repository} from "typeorm";
import {RolUsuarioEntity} from "./rolUsuario.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()

export class RolUsuarioService {
    constructor(
        @InjectRepository(RolUsuarioEntity)
        private repositorio: Repository<RolUsuarioEntity>
    ) {
    }

    crearUno(nuevoRolUsuario: RolUsuarioEntity){
        return this.repositorio.save(nuevoRolUsuario)
    }

    buscarTodos(){
        return this.repositorio.find()
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id)
    }

    buscarRol(idUusuario:Number){
        console.log("rol",idUusuario)
        let buscarRol:FindManyOptions<RolUsuarioEntity>
        buscarRol={
            where:{
                rol:Equal(idUusuario)


            }
        }
        return this.repositorio.find(buscarRol)
    }

    editarUno(rolUsuarioEditado: RolUsuarioEntity){
        return this.repositorio.save(rolUsuarioEditado)
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id)
    }
}